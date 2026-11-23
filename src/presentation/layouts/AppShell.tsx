import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '../../application/state';
import { ProjectModal } from '../components/projects/ProjectModal';
import { TopBar } from '../components/top_bar/TopBar';
import { AboutView } from '../views/AboutView';
import { HomeView } from '../views/HomeView';
import { ProjectsView } from '../views/ProjectsView';
import { SettingsView } from '../views/SettingsView';

const VIEWS = {
  home: HomeView,
  about: AboutView,
  projects: ProjectsView,
  settings: SettingsView,
} as const;

export function AppShell() {
  const { view } = useNavigation();
  const ActiveView = VIEWS[view];

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
            <ActiveView />
          </motion.div>
        </AnimatePresence>
      </main>
      <ProjectModal />
    </div>
  );
}
