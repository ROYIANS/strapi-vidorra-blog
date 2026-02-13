import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'

export function Dashboard() {
  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Clerk authentication is enabled. Continue in User Management.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Next step</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to='/users' className='text-primary underline underline-offset-4'>
              Open user management
            </Link>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
