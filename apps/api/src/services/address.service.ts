/**
 * AddressService — CRUD for a user's own addresses.
 * Every query is scoped to the authenticated userId — no cross-user access.
 */
import { prisma } from '@ecom/db'

export interface AddressInput {
  label?: string
  line1: string
  line2?: string
  city: string
  state: string
  postcode: string
  country: string
  isDefault?: boolean
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
  })
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createAddress(userId: string, data: AddressInput) {
  return prisma.$transaction(async (tx) => {
    // If new address is default, clear the existing default first
    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }
    return tx.address.create({ data: { ...data, userId } })
  })
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateAddress(
  userId: string,
  addressId: string,
  data: Partial<AddressInput>,
) {
  // Verify ownership before updating — prevents IDOR
  const existing = await prisma.address.findFirst({ where: { id: addressId, userId } })
  if (!existing) {
    throw Object.assign(new Error('Address not found'), { status: 404 })
  }

  return prisma.$transaction(async (tx) => {
    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId, isDefault: true, id: { not: addressId } },
        data: { isDefault: false },
      })
    }
    return tx.address.update({ where: { id: addressId }, data })
  })
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteAddress(userId: string, addressId: string) {
  const existing = await prisma.address.findFirst({ where: { id: addressId, userId } })
  if (!existing) {
    throw Object.assign(new Error('Address not found'), { status: 404 })
  }
  await prisma.address.delete({ where: { id: addressId } })
}
