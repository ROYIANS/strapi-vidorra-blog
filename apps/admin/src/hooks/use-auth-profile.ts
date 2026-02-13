import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

export function useAuthProfile() {
  const { isLoaded, isSignedIn } = useAuth()

  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => authService.getProfile(),
    enabled: isLoaded && isSignedIn,
  })
}
