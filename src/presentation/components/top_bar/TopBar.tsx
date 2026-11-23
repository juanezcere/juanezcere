import { motion } from 'framer-motion';
import { NavTabs } from './NavTabs';
import { ProfileBanner } from './ProfileBanner';
import { SystemControls } from './SystemControls';

export function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative z-20 flex flex-col items-center gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]"
    >
      <ProfileBanner />
      <NavTabs />
      <SystemControls />
    </motion.header>
  );
}
