import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'
import { t } from '@/i18n'

export function SettingsDisplay() {
  return (
    <ContentSection
      title={t('settings.display.title')}
      desc={t('settings.display.desc')}
    >
      <DisplayForm />
    </ContentSection>
  )
}
