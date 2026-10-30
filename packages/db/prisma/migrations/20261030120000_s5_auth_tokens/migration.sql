-- Migration: 20261030120000_s5_auth_tokens
-- S-5: Add email verification and password reset token columns to users table.
-- These are nullable and cleared once consumed; unique indexes prevent token reuse.
-- Also adds the optional label column to addresses for S-5 address CRUD.

ALTER TABLE "users"
  ADD COLUMN "emailVerificationToken"  TEXT,
  ADD COLUMN "emailVerificationExpiry" TIMESTAMP(3),
  ADD COLUMN "passwordResetToken"      TEXT,
  ADD COLUMN "passwordResetExpiry"     TIMESTAMP(3);

-- Unique indexes prevent two users sharing the same token
CREATE UNIQUE INDEX "users_emailVerificationToken_key" ON "users"("emailVerificationToken");
CREATE UNIQUE INDEX "users_passwordResetToken_key"     ON "users"("passwordResetToken");

-- Add label column to addresses (S-5 address CRUD)
ALTER TABLE "addresses"
  ADD COLUMN "label" TEXT;
