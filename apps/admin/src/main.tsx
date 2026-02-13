import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { zhCN } from '@clerk/localizations'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { t } from '@/i18n'
import { setAccessTokenProvider } from '@/lib/api-client'
import { handleServerError } from '@/lib/handle-server-error'
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
// Generated Routes
import { routeTree } from './routeTree.gen'
// Styles
import './styles/index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ClerkTokenBridge() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setAccessTokenProvider(null)
      return
    }

    setAccessTokenProvider(async () => getToken())
    void queryClient.invalidateQueries()
    return () => setAccessTokenProvider(null)
  }, [getToken, isLoaded, isSignedIn, queryClient])

  return null
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error(t('app.contentNotModified'))
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          // For Clerk auth, a transient 401 may occur before token bridge is ready.
          // Avoid forcing a sign-in redirect loop and let queries retry/refetch.
          toast.error(t('app.unauthorizedRetrying'))
        }
        if (error.response?.status === 500) {
          toast.error(t('app.internalServerError'))
        }
      }
    },
  }),
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {PUBLISHABLE_KEY ? (
          <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            localization={zhCN}
            afterSignOutUrl='/sign-in'
            signInUrl='/sign-in'
            signUpUrl='/sign-up'
            signInFallbackRedirectUrl='/'
            signUpFallbackRedirectUrl='/'
          >
            <ThemeProvider>
              <FontProvider>
                <DirectionProvider>
                  <ClerkTokenBridge />
                  <RouterProvider router={router} />
                </DirectionProvider>
              </FontProvider>
            </ThemeProvider>
          </ClerkProvider>
        ) : (
          <div style={{ padding: '16px', color: 'crimson' }}>
            {t('app.missingClerkKey')}
          </div>
        )}
      </QueryClientProvider>
    </StrictMode>
  )
}
