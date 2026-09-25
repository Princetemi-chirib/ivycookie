// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WC_URL = process.env.WOOCOMMERCE_URL; // e.g. https://yourstore.com
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const WP_USERNAME = process.env.WP_APPLICATION_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APPLICATION_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WP_USERNAME || !WP_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Store backend is not configured yet.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const receipt = formData.get('receipt') as File | null;
    const orderDataRaw = formData.get('orderData') as string;
    const orderData = JSON.parse(orderDataRaw);

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt file is required.' }, { status: 400 });
    }

    // 1. Upload receipt to WordPress media library
    const wpAuth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
    const receiptBuffer = Buffer.from(await receipt.arrayBuffer());

    const mediaRes = await fetch(`${WC_URL}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${wpAuth}`,
        'Content-Disposition': `attachment; filename="${receipt.name}"`,
        'Content-Type': receipt.type || 'application/octet-stream',
      },
      body: receiptBuffer,
    });

    if (!mediaRes.ok) {
      const err = await mediaRes.text();
      console.error('Media upload failed:', err);
      return NextResponse.json({ error: 'Failed to upload receipt.' }, { status: 500 });
    }

    const media = await mediaRes.json();
    const receiptUrl: string = media.source_url;

    // 2. Create the WooCommerce order
    const wcAuth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    const orderPayload = {
      status: 'on-hold', // pending manual receipt verification
      billing: {
        first_name: orderData.fullName?.split(' ')[0] ?? '',
        last_name: orderData.fullName?.split(' ').slice(1).join(' ') ?? '',
        email: orderData.email,
        phone: orderData.phone,
        address_1: orderData.address,
        city: orderData.city,
        state: orderData.state,
        country: 'NG',
      },
      line_items: orderData.items.map((item: { productId: string; variationId?: number; quantity: number }) => {
        const line: Record<string, unknown> = {
          product_id: Number(item.productId),
          quantity: item.quantity,
        };
        if (item.variationId) {
          line.variation_id = item.variationId;
        }
        return line;
      }),
      payment_method: 'bank_transfer_manual',
      payment_method_title: 'Direct Bank Transfer',
      customer_note: `Receipt uploaded by customer at checkout: ${receiptUrl}`,
    };

    const orderRes = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${wcAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!orderRes.ok) {
      const err = await orderRes.text();
      console.error('Order creation failed:', err);
      return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
    }

    const order = await orderRes.json();

    // 3. Add an order note with the embedded receipt image (renders inline in WP Admin desktop)
    await fetch(`${WC_URL}/wp-json/wc/v3/orders/${order.id}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${wcAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: `<p><strong>Payment receipt uploaded:</strong></p><p><a href="${receiptUrl}" target="_blank"><img src="${receiptUrl}" style="max-width:300px;border-radius:8px;" /></a></p><p><a href="${receiptUrl}" target="_blank">${receiptUrl}</a></p>`,
        customer_note: false,
      }),
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.number,
    });
  } catch (err) {
    console.error('Order submission error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}