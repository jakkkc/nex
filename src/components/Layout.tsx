import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Moon, Sun, Monitor, Menu, X, Rocket, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { IMAGES } from '../constants';

const MarketingWord: React.FC<{ word: any; mouseX: any; mouseY: any; i: number }> = ({ word, mouseX, mouseY, i }) => {
  const x = useTransform(mouseX, (val: number) => val / (100 + Math.abs(word.power)));
  const y = useTransform(mouseY, (val: number) => val / (100 + Math.abs(word.power)));

  return (
    <motion.div
      style={{
        x,
        y,
        top: word.top,
        left: word.left,
      }}
      className={`absolute font-display uppercase leading-none select-none pointer-events-none ${word.size}`}
      animate={{
        opacity: [word.opacity, word.opacity * 2, word.opacity],
      }}
      transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
    >
      {word.text}
    </motion.div>
  );
};

const Layout: React.FC = () => {
  const { mode, toggleMode, colorTheme, setColorTheme } = useTheme();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const themes: { name: string; value: 'blue' | 'pink' | 'purple' | 'green'; color: string }[] = [
    { name: 'Blue', value: 'blue', color: '#0ea5e9' },
    { name: 'Pink', value: 'pink', color: '#db2777' },
    { name: 'Purple', value: 'purple', color: '#9333ea' },
    { name: 'Green', value: 'green', color: '#059669' },
  ];

  const marketingWords = [
    { text: 'CONVERSION', size: 'text-[10vw]', top: '10%', left: '5%', opacity: 0.02, power: 20 },
    { text: 'DOMINANCE', size: 'text-[12vw]', top: '40%', left: '20%', opacity: 0.015, power: -30 },
    { text: 'STRATEGY', size: 'text-[8vw]', top: '70%', left: '60%', opacity: 0.02, power: 40 },
    { text: 'ROI', size: 'text-[15vw]', top: '20%', left: '80%', opacity: 0.01, power: -15 },
    { text: 'GROWTH', size: 'text-[9vw]', top: '80%', left: '10%', opacity: 0.02, power: 25 },
    { text: 'PIPELINE', size: 'text-[11vw]', top: '55%', left: '75%', opacity: 0.03, power: -45 },
  ];

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-20 bg-bg transition-colors duration-1000">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
          {/* Parallax Marketing Clouds */}
          {marketingWords.map((word, i) => (
            <MarketingWord key={i} word={word} mouseX={mouseX} mouseY={mouseY} i={i} />
          ))}

          <motion.div
            animate={{
              scale: [1, 1.2, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
              x: [0, 100, -50, 0],
              y: [0, 50, 100, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary blur-[200px] rounded-full opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1.2, 1],
              rotate: [0, -90, -180, -270, -360],
              x: [0, -120, 80, 0],
              y: [0, 80, -40, 0],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-accent blur-[200px] rounded-full opacity-10"
          />
          <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass px-6 md:px-10 py-4 rounded-[2rem] flex items-center justify-between border-white/20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-primary/10 group-hover:rotate-12 transition-transform">
                N
              </div>
              <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">NexInk</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <Link to="/" className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">Home</Link>
              <Link to="/blog" className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">Intel</Link>
              {user ? (
                <Link to="/admin" className="text-sm font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">Terminal</Link>
              ) : (
                <Link to="/login" className="text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">Login</Link>
              )}
              
              <div className="h-6 w-[1px] bg-text/10" />
              
              <button 
                onClick={toggleMode}
                className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all"
              >
                {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleMode} className="p-2">
                {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-4 glass p-8 rounded-[2.5rem] flex flex-col gap-6 border-white/20"
            >
              <Link to="/" className="text-2xl font-black uppercase tracking-tighter">Home</Link>
              <Link to="/blog" className="text-2xl font-black uppercase tracking-tighter">Intel</Link>
              {user && <Link to="/admin" className="text-2xl font-black uppercase tracking-tighter">Terminal</Link>}
              <Link to="/login" className="text-2xl font-black uppercase tracking-tighter">Login</Link>
              <div className="pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                 <span className="text-xs font-black uppercase tracking-widest opacity-40">System Menu</span>
                 <Palette className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-24 md:pt-32">
        <Outlet />
      </main>

      <footer className="px-4 md:px-8 py-20 mt-20">
        <div className="max-w-7xl mx-auto glass p-10 md:p-20 rounded-[4rem] border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">N</div>
                <span className="text-2xl font-black tracking-tighter uppercase">NexInk</span>
              </Link>
              <p className="text-text-secondary font-medium leading-relaxed">
                Engineering digital dominance through data-driven creativity and systematic conversion pipelines.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Navigation</h4>
              <div className="flex flex-col gap-4 font-black uppercase text-xs tracking-widest">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/blog" className="hover:text-primary transition-colors">Intel</Link>
                <Link to="/login" className="hover:text-primary transition-colors">Officer Access</Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Connect</h4>
              <div className="flex flex-col gap-4 font-black uppercase text-xs tracking-widest">
                <a href="#" className="hover:text-primary transition-colors">X / Twitter</a>
                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Intelligence</h4>
              <p className="text-xs text-text-secondary font-medium uppercase tracking-widest">System Status: Operational</p>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Uptime 99.9%
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">© 2024 NexInk // Strategic Mastery v1.0.42</div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
