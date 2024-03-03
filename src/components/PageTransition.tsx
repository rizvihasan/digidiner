import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';

export const PageTransition: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', width: '100%' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};
