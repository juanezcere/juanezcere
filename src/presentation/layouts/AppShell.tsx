import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '../../application/state';
import { TopBar } from '../components/top_bar/TopBar';
import { HomeView } from '../views/HomeView';

export function AppShell() {
  const { t } = useTranslation();
  const { view } = useNavigation();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-6 px-6 py-6 lg:px-9">
      <TopBar />
      <main className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-1 flex-col"
          >
            {view === 'home' ? (
              <HomeView />
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="glass-panel rounded-3xl px-10 py-8 text-center">
                  <p className="text-xs font-semibold tracking-[0.8px] text-accent uppercase">
                    {t('app.name')}
                  </p>
                  <h1 className="mt-2 text-2xl font-extrabold">{t(`nav.${view}`)}</h1>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
