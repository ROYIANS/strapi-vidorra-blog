import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/clerk-react'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthLayout } from '@/features/auth/auth-layout'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp fallback={<Skeleton className='h-[30rem] w-[25rem]' />} />
    </AuthLayout>
  )
}
