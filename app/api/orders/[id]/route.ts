// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WC_URL = process.env.WOOCOMMERCE_URL;
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      return NextResponse.json({ error: 'Store backend is not configured.' }, { status: 500 });
    }

    const { id } = await params;
    const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');

    const res = await fetch(`${WC_URL}/wp-json/wc/v3/orders/${id}`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Order not found.' }, { status: res.status });
    }

    const order = await res.json();

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.number,
      status: order.status,
      dateCreated: order.date_created,
      total: order.total,
      billing: order.billing,
      lineItems: order.line_items.map((item: { name: string; quantity: number; total: string }) => ({
        name: item.name,
        quantity: item.quantity,
        total: item.total,
      })),
    });
  } catch (err) {
    console.error('Fetch order error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}