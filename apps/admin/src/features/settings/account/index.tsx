import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'
import { t } from '@/i18n'

export function SettingsAccount() {
  return (
    <ContentSection
      title={t('settings.account.title')}
      desc={t('settings.account.desc')}
    >
      <AccountForm />
    </ContentSection>
  )
}
