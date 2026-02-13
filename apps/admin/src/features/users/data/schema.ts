import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('READER'),
  z.literal('EDITOR'),
  z.literal('ADMIN'),
])

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  bio: z.string().nullable(),
  role: userRoleSchema,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
