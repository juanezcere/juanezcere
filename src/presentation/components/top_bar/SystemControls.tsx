import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Moon, Palette, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings, useTheme } from '../../../application/state';
import { LANGUAGES, THEMES } from '../../../domain/constants';
import type { LanguageCode, ThemeAccentId } from '../../../domain/entities';
import { ClockService } from '../../../infrastructure/time/clock_service';
import { useClock } from '../../hooks/use_clock';
import { GlassPanel } from '../common/GlassPanel';
import { IconButton } from '../common/IconButton';

type OpenPopover = 'theme' | 'language' | null;

const clockService = new ClockService();

export function SystemControls() {
  const { t } = useTranslation();
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const { settings, setLanguage } = useSettings();
  const time = useClock(clockService, settings.language);
  const [openPopover, setOpenPopover] = useState<OpenPopover>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPopover) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPopover(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openPopover]);

  const selectTheme = (themeId: ThemeAccentId) => {
    setTheme(themeId);
    setOpenPopover(null);
  };

  const selectLanguage = (language: LanguageCode) => {
    setLanguage(language);
    setOpenPopover(null);
  };

  return (
    <div ref={controlsRef} className="relative lg:justify-self-end">
      <GlassPanel className="flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2">
        <IconButton
          icon={Palette}
          label={t('controls.theme')}
          size="sm"
          iconSize={18}
          active={openPopover === 'theme'}
          pressed={openPopover === 'theme'}
          onClick={() => setOpenPopover((current) => (current === 'theme' ? null : 'theme'))}
        />
        <IconButton
          icon={mode === 'dark' ? Moon : Sun}
          label={t('controls.mode')}
          size="sm"
          iconSize={18}
          pressed={mode === 'dark'}
          onClick={toggleMode}
        />
        <IconButton
          icon={Globe}
          label={t('controls.language')}
          size="sm"
          iconSize={18}
          active={openPopover === 'language'}
          pressed={openPopover === 'language'}
          onClick={() =>
            setOpenPopover((current) => (current === 'language' ? null : 'language'))
          }
        />
        <time
          className="border-l border-glass-border pl-2 text-sm font-semibold tracking-wide tabular-nums"
          title={t('controls.clock')}
        >
          {time}
        </time>
      </GlassPanel>

      <AnimatePresence>
        {openPopover === 'theme' ? (
          <motion.div
            key="theme"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-popover absolute top-14 right-0 z-50 flex w-[220px] flex-col gap-2.5 rounded-[18px] p-3.5"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.8px] text-text-secondary uppercase">
              {t('controls.themeTitle')}
            </span>
            <div className="flex flex-wrap gap-2">
              {THEMES.map((themeItem) => (
                <button
                  key={themeItem.id}
                  type="button"
                  aria-label={themeItem.label}
                  aria-pressed={theme === themeItem.id}
                  onClick={() => selectTheme(themeItem.id)}
                  style={{ backgroundColor: themeItem.color }}
                  className={`h-7 w-7 rounded-full border-2 transition hover:scale-110 ${
                    theme === themeItem.id
                      ? 'scale-110 border-white shadow-[0_0_10px_var(--accent-glow)]'
                      : 'border-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : null}

        {openPopover === 'language' ? (
          <motion.div
            key="language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-popover absolute top-14 right-0 z-50 flex w-[210px] flex-col gap-2.5 rounded-[18px] p-3.5"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.8px] text-text-secondary uppercase">
              {t('controls.languageTitle')}
            </span>
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  aria-pressed={settings.language === language.code}
                  onClick={() => selectLanguage(language.code)}
                  className={`flex items-center justify-between rounded-[10px] px-2.5 py-1.5 text-left text-sm transition hover:bg-accent-soft ${
                    settings.language === language.code ? 'bg-accent-soft font-semibold' : ''
                  }`}
                >
                  <span>{language.label}</span>
                  <span className="text-[0.75rem] opacity-60">
                    {language.code.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
