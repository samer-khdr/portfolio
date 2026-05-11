import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import aboutData from '../data/about.json';

export default function Header({ scrolled }) {
  const { name } = aboutData;
  const navItems = ['About', 'Experience', 'Work', 'Contact'];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const APP_BAR_HEIGHT = 76;

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 sm:gap-12">
          <motion.a
            href="#"
            className="text-lg font-serif font-bold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1"
            whileHover={{ opacity: 0.85 }}
            onClick={closeMobileMenu}
          >
            {name}
          </motion.a>

          <div className="hidden sm:flex gap-8 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="sm:hidden relative z-[100] flex h-11 w-11 items-center justify-center rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative h-5 w-6">
              <motion.span
                className="absolute left-0 top-0 block h-[2px] w-6 rounded-full bg-current"
                animate={mobileMenuOpen ? { top: 9, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ transformOrigin: '50% 50%' }}
              />
              <motion.span
                className="absolute left-0 top-[9px] block h-[2px] w-6 rounded-full bg-current"
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.16, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute left-0 top-[18px] block h-[2px] w-6 rounded-full bg-current"
                animate={mobileMenuOpen ? { top: 9, rotate: -45 } : { top: 18, rotate: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ transformOrigin: '50% 50%' }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              id="mobile-menu"
              className="fixed inset-x-0 bottom-0 z-[70] sm:hidden bg-slate-950"
              style={{ top: APP_BAR_HEIGHT }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile navigation"
            >
              <nav className="flex min-h-full flex-col justify-start px-8 pt-10 pb-8">
                <p className="mb-8 text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
                  Menu
                </p>

                <div className="flex flex-col gap-5">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={closeMobileMenu}
                      className="text-4xl font-serif font-bold leading-tight text-white transition-colors hover:text-amber-400 active:text-amber-300"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        delay: 0.04 + idx * 0.06,
                        duration: 0.24,
                        ease: 'easeOut',
                      }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}