import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'
import { t } from '@/i18n'

export function SettingsAppearance() {
  return (
    <ContentSection
      title={t('settings.appearance.title')}
      desc={t('settings.appearance.desc')}
    >
      <AppearanceForm />
    </ContentSection>
  )
}
