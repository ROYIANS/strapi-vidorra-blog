import { getRouteApi } from '@tanstack/react-router'
import { t } from '@/i18n'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { useUsers } from '@/hooks/use-users'
import { UsersDialogs } from './components/users-dialogs'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'

const route = getRouteApi('/_authenticated/users/')

export function Users() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data, isLoading } = useUsers(search.page || 1, search.pageSize || 10)

  return (
    <UsersProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('users.title')}</h2>
            <p className='text-muted-foreground'>
              {t('users.description')}
            </p>
          </div>
        </div>
        <UsersTable
          data={data?.data || []}
          meta={data?.meta}
          isLoading={isLoading}
          search={search}
          navigate={navigate}
        />
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
