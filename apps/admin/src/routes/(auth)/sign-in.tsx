import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthLayout } from '@/features/auth/auth-layout'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignInPage,
  validateSearch: searchSchema,
})

function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        fallback={<Skeleton className='h-[30rem] w-[25rem]' />}
      />
    </AuthLayout>
  )
}
