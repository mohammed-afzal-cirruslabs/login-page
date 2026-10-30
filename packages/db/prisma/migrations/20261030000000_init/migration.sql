-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 20261030000000_init
-- Initial schema for Amazon-modelled e-commerce platform (S-4)
-- ─────────────────────────────────────────────────────────────────────────────

-- Enums

CREATE TYPE "Role" AS ENUM ('BUYER', 'SELLER', 'ADMIN');
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');
CREATE TYPE "OrderStatus" AS ENUM (
  'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED',
  'DELIVERED', 'CANCELLED', 'REFUNDED'
);
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- ─── users ───────────────────────────────────────────────────────────────────

CREATE TABLE "users" (
    "id"            TEXT         NOT NULL,
    "email"         TEXT         NOT NULL,
    "passwordHash"  TEXT         NOT NULL,
    "role"          "Role"       NOT NULL DEFAULT 'BUYER',
    "emailVerified" BOOLEAN      NOT NULL DEFAULT false,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- ─── addresses ───────────────────────────────────────────────────────────────

CREATE TABLE "addresses" (
    "id"        TEXT    NOT NULL,
    "userId"    TEXT    NOT NULL,
    "line1"     TEXT    NOT NULL,
    "line2"     TEXT,
    "city"      TEXT    NOT NULL,
    "state"     TEXT    NOT NULL,
    "postcode"  TEXT    NOT NULL,
    "country"   TEXT    NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "addresses_userId_idx" ON "addresses"("userId");

ALTER TABLE "addresses"
    ADD CONSTRAINT "addresses_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── categories ──────────────────────────────────────────────────────────────

CREATE TABLE "categories" (
    "id"       TEXT NOT NULL,
    "name"     TEXT NOT NULL,
    "slug"     TEXT NOT NULL,
    "parentId" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

ALTER TABLE "categories"
    ADD CONSTRAINT "categories_parentId_fkey"
    FOREIGN KEY ("parentId") REFERENCES "categories"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- ─── products ────────────────────────────────────────────────────────────────

CREATE TABLE "products" (
    "id"           TEXT            NOT NULL,
    "title"        TEXT            NOT NULL,
    "slug"         TEXT            NOT NULL,
    "description"  TEXT,
    "price"        DECIMAL(12, 2)  NOT NULL,
    "comparePrice" DECIMAL(12, 2),
    "sku"          TEXT,
    "stock"        INTEGER         NOT NULL DEFAULT 0,
    "categoryId"   TEXT            NOT NULL,
    "sellerId"     TEXT            NOT NULL,
    "status"       "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt"    TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "products_slug_key"  ON "products"("slug");
CREATE UNIQUE INDEX "products_sku_key"   ON "products"("sku");
CREATE INDEX "products_categoryId_idx"   ON "products"("categoryId");
CREATE INDEX "products_status_idx"       ON "products"("status");
CREATE INDEX "products_sellerId_idx"     ON "products"("sellerId");
CREATE INDEX "products_createdAt_idx"    ON "products"("createdAt");

ALTER TABLE "products"
    ADD CONSTRAINT "products_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "categories"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products"
    ADD CONSTRAINT "products_sellerId_fkey"
    FOREIGN KEY ("sellerId") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── product_images ──────────────────────────────────────────────────────────

CREATE TABLE "product_images" (
    "id"        TEXT    NOT NULL,
    "productId" TEXT    NOT NULL,
    "url"       TEXT    NOT NULL,
    "position"  INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");

ALTER TABLE "product_images"
    ADD CONSTRAINT "product_images_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── variants ────────────────────────────────────────────────────────────────

CREATE TABLE "variants" (
    "id"         TEXT           NOT NULL,
    "productId"  TEXT           NOT NULL,
    "name"       TEXT           NOT NULL,
    "value"      TEXT           NOT NULL,
    "priceDelta" DECIMAL(12, 2) NOT NULL DEFAULT 0,
    "stock"      INTEGER        NOT NULL DEFAULT 0,
    "sku"        TEXT,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "variants_sku_key"       ON "variants"("sku");
CREATE INDEX "variants_productId_idx"        ON "variants"("productId");

ALTER TABLE "variants"
    ADD CONSTRAINT "variants_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── cart_items ──────────────────────────────────────────────────────────────

CREATE TABLE "cart_items" (
    "id"        TEXT         NOT NULL,
    "userId"    TEXT         NOT NULL,
    "variantId" TEXT         NOT NULL,
    "quantity"  INTEGER      NOT NULL DEFAULT 1,
    "addedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cart_items_userId_variantId_key" ON "cart_items"("userId", "variantId");
CREATE INDEX "cart_items_userId_idx" ON "cart_items"("userId");

ALTER TABLE "cart_items"
    ADD CONSTRAINT "cart_items_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cart_items"
    ADD CONSTRAINT "cart_items_variantId_fkey"
    FOREIGN KEY ("variantId") REFERENCES "variants"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── orders ──────────────────────────────────────────────────────────────────

CREATE TABLE "orders" (
    "id"                    TEXT           NOT NULL,
    "userId"                TEXT           NOT NULL,
    "status"                "OrderStatus"  NOT NULL DEFAULT 'PENDING',
    "subtotal"              DECIMAL(12, 2) NOT NULL,
    "tax"                   DECIMAL(12, 2) NOT NULL,
    "shippingCost"          DECIMAL(12, 2) NOT NULL,
    "total"                 DECIMAL(12, 2) NOT NULL,
    "shippingAddressId"     TEXT           NOT NULL,
    "stripePaymentIntentId" TEXT,
    "createdAt"             TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "orders_userId_idx"    ON "orders"("userId");
CREATE INDEX "orders_status_idx"    ON "orders"("status");
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

ALTER TABLE "orders"
    ADD CONSTRAINT "orders_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "orders"
    ADD CONSTRAINT "orders_shippingAddressId_fkey"
    FOREIGN KEY ("shippingAddressId") REFERENCES "addresses"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── order_items ─────────────────────────────────────────────────────────────

CREATE TABLE "order_items" (
    "id"        TEXT           NOT NULL,
    "orderId"   TEXT           NOT NULL,
    "variantId" TEXT           NOT NULL,
    "quantity"  INTEGER        NOT NULL,
    "unitPrice" DECIMAL(12, 2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

ALTER TABLE "order_items"
    ADD CONSTRAINT "order_items_orderId_fkey"
    FOREIGN KEY ("orderId") REFERENCES "orders"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "order_items"
    ADD CONSTRAINT "order_items_variantId_fkey"
    FOREIGN KEY ("variantId") REFERENCES "variants"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─── payments ────────────────────────────────────────────────────────────────

CREATE TABLE "payments" (
    "id"                    TEXT            NOT NULL,
    "orderId"               TEXT            NOT NULL,
    "stripePaymentIntentId" TEXT            NOT NULL,
    "amount"                DECIMAL(12, 2)  NOT NULL,
    "currency"              TEXT            NOT NULL DEFAULT 'usd',
    "status"                "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt"             TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "payments_orderId_key"               ON "payments"("orderId");
CREATE UNIQUE INDEX "payments_stripePaymentIntentId_key" ON "payments"("stripePaymentIntentId");
CREATE INDEX "payments_stripePaymentIntentId_idx"        ON "payments"("stripePaymentIntentId");

ALTER TABLE "payments"
    ADD CONSTRAINT "payments_orderId_fkey"
    FOREIGN KEY ("orderId") REFERENCES "orders"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── reviews ─────────────────────────────────────────────────────────────────

CREATE TABLE "reviews" (
    "id"              TEXT         NOT NULL,
    "productId"       TEXT         NOT NULL,
    "userId"          TEXT         NOT NULL,
    "rating"          INTEGER      NOT NULL,
    "title"           TEXT,
    "body"            TEXT,
    "verifiedPurchase" BOOLEAN     NOT NULL DEFAULT false,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey"                  PRIMARY KEY ("id"),
    CONSTRAINT "reviews_rating_check"          CHECK ("rating" BETWEEN 1 AND 5)
);

CREATE UNIQUE INDEX "reviews_productId_userId_key" ON "reviews"("productId", "userId");
CREATE INDEX "reviews_productId_idx"               ON "reviews"("productId");
CREATE INDEX "reviews_userId_idx"                  ON "reviews"("userId");

ALTER TABLE "reviews"
    ADD CONSTRAINT "reviews_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reviews"
    ADD CONSTRAINT "reviews_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
