/**
 * Seed script — development only.
 * Run: pnpm --filter @ecommerce/db db:seed
 *
 * Creates one admin user, one root category, and one active product
 * so the rest of the stack has something to work with immediately.
 */

import { PrismaClient, Role, ProductStatus } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

// Deterministic fake hash — NOT for production use
function fakeHash(plain: string) {
  return "$fake$" + createHash("sha256").update(plain).digest("hex");
}

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: fakeHash("admin-password"),
      role: Role.ADMIN,
      emailVerified: true,
    },
  });

  // Seller user
  const seller = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      passwordHash: fakeHash("seller-password"),
      role: Role.SELLER,
      emailVerified: true,
    },
  });

  // Root category
  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  // Sample product
  await prisma.product.upsert({
    where: { slug: "sample-wireless-headphones" },
    update: {},
    create: {
      title: "Sample Wireless Headphones",
      slug: "sample-wireless-headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 79.99,
      comparePrice: 129.99,
      sku: "WH-SAMPLE-001",
      stock: 100,
      categoryId: electronics.id,
      sellerId: seller.id,
      status: ProductStatus.ACTIVE,
      images: {
        create: [{ url: "https://placehold.co/800x800?text=Headphones", position: 0 }],
      },
      variants: {
        create: [
          { name: "Color", value: "Black", priceDelta: 0, stock: 60, sku: "WH-SAMPLE-001-BLK" },
          { name: "Color", value: "White", priceDelta: 5, stock: 40, sku: "WH-SAMPLE-001-WHT" },
        ],
      },
    },
  });

  console.log(`✅ Seed complete — admin: ${admin.email}, seller: ${seller.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
