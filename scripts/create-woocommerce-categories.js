require("dotenv").config({ path: ".env.local" });

const categories = [
  "Feminine Hygiene",
  "Probiotics & Supplements",
  "Intimacy / Sexual Wellness",
  "Sex Toys",
  "Kits & Bundles",
];

const WC_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

if (!WC_URL || !WC_KEY || !WC_SECRET) {
  console.error("❌ Missing WooCommerce environment variables.");
  console.error({
    WOOCOMMERCE_URL: !!WC_URL,
    WOOCOMMERCE_CONSUMER_KEY: !!WC_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: !!WC_SECRET,
  });
  process.exit(1);
}

const auth =
  "Basic " +
  Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");

async function createCategories() {
  console.log(`\nConnecting to: ${WC_URL}`);
  console.log("Creating WooCommerce categories...\n");

  for (const name of categories) {
    try {
      // Check if category already exists
      const searchUrl =
        `${WC_URL}/wp-json/wc/v3/products/categories?search=` +
        encodeURIComponent(name);

      const searchResponse = await fetch(searchUrl, {
        headers: {
          Authorization: auth,
        },
      });

      if (!searchResponse.ok) {
        const error = await searchResponse.text();
        throw new Error(
          `WooCommerce returned ${searchResponse.status}: ${error}`
        );
      }

      const existing = await searchResponse.json();

      if (existing.length > 0) {
        console.log(`✓ Already exists: ${name} (ID: ${existing[0].id})`);
        continue;
      }

      // Create category
      const createResponse = await fetch(
        `${WC_URL}/wp-json/wc/v3/products/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      const result = await createResponse.json();

      if (!createResponse.ok) {
        console.error(`✗ Failed: ${name}`);
        console.error(result);
      } else {
        console.log(`✓ Created: ${name} (ID: ${result.id})`);
      }
    } catch (error) {
      console.error(`✗ Error creating ${name}:`);
      console.error(error.message);
    }
  }

  console.log("\n✅ Done!");
}

createCategories();