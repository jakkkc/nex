import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useMagnetic } from '../hooks/useMagnetic';
import { IMAGES } from '../constants';

const Particle: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x, y }}
      animate={{ 
        opacity: 0, 
        scale: 0, 
        x: x + (Math.random() - 0.5) * 200, 
        y: y + (Math.random() - 0.5) * 200 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed pointer-events-none z-[100] w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
};

const ThemeSwitcher: React.FC = () => {
    const { colorTheme, setTheme } = useTheme();
    const themes = [
        { id: 'neon-void', color: '#7b5af5' },
        { id: 'frost', color: '#90caf9' },
        { id: 'cosmic', color: '#e0b84f' },
        { id: 'ember', color: '#ff7043' }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[9998] glass-pill flex items-center gap-4 p-2 px-3 shadow-2xl scale-110 md:scale-100">
            {themes.map(t => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`w-6 h-6 rounded-full transition-all border-2 ${colorTheme === t.id ? 'border-white scale-125' : 'border-transparent opacity-50'}`}
                    style={{ backgroundColor: t.color }}
                />
            ))}
        </div>
    );
};

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)'];

    const handleClick = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(prev => [...prev.slice(-24), ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
      }, 550);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const logoMagnetic = useMagnetic<HTMLAnchorElement>(8);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Cursor Spotlight */}
      <div 
        ref={spotlightRef}
        className="fixed pointer-events-none z-[9999] w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', opacity: 0.13 }}
      />

      {/* Ambient Animated Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="ambient-blob w-[600px] h-[600px] bg-[var(--accent-1)] opacity-[0.06] blur-[120px] top-[-100px] left-[-100px]" />
          <div className="ambient-blob w-[500px] h-[500px] bg-[var(--accent-2)] opacity-[0.06] blur-[100px] top-[30%] right-[-100px]" style={{ animationDelay: '-2s' }} />
          <div className="ambient-blob w-[550px] h-[550px] bg-[var(--accent-3)] opacity-[0.05] blur-[110px] bottom-[-100px] left-[10%]" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Particles */}
      {particles.map(p => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      <ThemeSwitcher />

      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-[24px]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative">
          <Link 
            to="/" 
            ref={logoMagnetic.ref}
            className="flex items-center gap-3 group"
          >
            <img 
              src={IMAGES.LOGO} 
              className="w-10 h-10 object-contain rounded-[10px] shadow-lg transition-transform hover:scale-110" 
              alt="NexInk Logo" 
            />
            <span className="text-xl font-light tracking-[0.06em] uppercase text-white">NexInk</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {[
              { name: 'Home', path: '/' },
              { name: 'Intel', path: '/blog' },
              { name: 'Access', path: '/login' }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="relative text-[11px] mono-accent text-white/70 hover:text-white transition-colors group px-1"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-3)] -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
             <Link to="/blog" className="glow-border px-8 py-3 text-[11px] mono-accent text-white uppercase">
               Deploy Intel
             </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 glass flex items-center justify-center shadow-lg border-white/20"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 glass p-8 flex flex-col gap-6"
            >
              <Link to="/" className="text-2xl font-light uppercase tracking-widest">Home</Link>
              <Link to="/blog" className="text-2xl font-light uppercase tracking-widest">Intel</Link>
              {user && <Link to="/admin" className="text-2xl font-light uppercase tracking-widest">Terminal</Link>}
              <Link to="/login" className="text-2xl font-light uppercase tracking-widest">Login</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="px-4 md:px-8 py-20 mt-20">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img 
                  src={IMAGES.LOGO} 
                  className="w-12 h-12 object-contain" 
                  alt="NexInk" 
                />
                <span className="text-2xl font-light tracking-widest uppercase text-white">NexInk</span>
              </div>
              <p className="text-[15px] leading-relaxed text-text-secondary">
                Redefining the standard of digital aesthetics through systematic glassmorphism and data-driven intelligence.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] mono-accent opacity-40">System</h4>
              <div className="flex flex-col gap-4 text-xs font-light tracking-widest uppercase">
                <Link to="/" className="hover:text-primary transition-colors">Core</Link>
                <Link to="/blog" className="hover:text-primary transition-colors">Intelligence</Link>
                <Link to="/login" className="hover:text-primary transition-colors">Access</Link>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] mono-accent opacity-40">Frequency</h4>
              <div className="flex flex-col gap-4 text-xs font-light tracking-widest uppercase">
                <a href="#" className="hover:text-primary transition-colors">X / Terminal</a>
                <a href="#" className="hover:text-primary transition-colors">Network</a>
                <a href="#" className="hover:text-primary transition-colors">Artifacts</a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] mono-accent opacity-40">Integrity</h4>
              <p className="text-[10px] mono-accent opacity-40">Status: Operational</p>
              <div className="p-6 glass border-primary/20">
                <div className="flex items-center gap-3 text-primary text-[10px] mono-accent">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Latency: 24ms
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] mono-accent opacity-30 uppercase tracking-widest">© 2024 NEXINK SYSTEMS // v3.0 // GLASS</div>
            <div className="flex gap-12 text-[10px] mono-accent opacity-40 uppercase tracking-widest">
              <a href="#">Privacy Protocol</a>
              <a href="#">Terms of Access</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
