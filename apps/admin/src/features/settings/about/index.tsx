import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { t } from '@/i18n'
import { ContentSection } from '../components/content-section'

const appVersion = import.meta.env.VITE_APP_VERSION ?? '0.0.1-dev'

export function SettingsAbout() {
  return (
    <ContentSection
      title={t('settings.about.title')}
      desc={t('settings.about.desc')}
    >
      <div className='space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.about.application')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('settings.about.name')}</span>
              <span className='text-sm text-muted-foreground'>
                Vidorra Admin
              </span>
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('settings.about.version')}</span>
              <span className='text-sm text-muted-foreground'>{appVersion}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.about.stack')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('settings.about.frontend')}</span>
              <span className='text-sm text-muted-foreground'>
                React + TanStack Router
              </span>
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('settings.about.backend')}</span>
              <span className='text-sm text-muted-foreground'>NestJS + Prisma</span>
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('settings.about.auth')}</span>
              <span className='text-sm text-muted-foreground'>Clerk</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentSection>
  )
}
