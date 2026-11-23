import { useTranslation } from 'react-i18next';
import { useNavigation, useSettings, useTheme } from '../../../application/state';

export function PhaseStatus() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { theme, mode } = useTheme();
  const { view } = useNavigation();

  return (
    <main className="bootstrap">
      <h1>{t('app.phaseTitle')}</h1>
      <p>{t('app.phaseDescription')}</p>
      <p>
        {t(`nav.${view}`)} · {theme} · {mode} · {settings.language}
      </p>
    </main>
  );
}
