import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Rocket, 
  TrendingUp, 
  Target, 
  Star,
  Quote,
  Users
} from 'lucide-react';
import { IMAGES } from '../constants';
import { useMagnetic } from '../hooks/useMagnetic';

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
      
      const shineX = (e.clientX - rect.left) / rect.width * 100;
      const shineY = (e.clientY - rect.top) / rect.height * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.1) 0%, transparent 80%)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1200px) rotateY(0deg) rotateX(0deg)`;
      card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      shine.style.background = 'transparent';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'none';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass-card relative overflow-hidden group ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={shineRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
    const ref = useMagnetic(0.35);
    return (
        <button 
            ref={ref}
            onClick={onClick}
            className={`glow-border px-8 py-4 text-[11px] mono-accent ${className}`}
        >
            {children}
        </button>
    );
};

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any
    }
  };

  return (
    <div className="flex flex-col gap-32 md:gap-64 px-4 md:px-8 max-w-7xl mx-auto pb-48 overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center relative pt-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass border-white/10 text-primary text-[10px] mono-accent">
            <Rocket className="w-4 h-4" /> System Protocol: Dominance
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-[14vw] md:text-[10rem] font-light uppercase leading-[0.9] tracking-[0.06em]">
            Digital<br />
            <span className="text-gradient font-normal">Aesthetics.</span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-16">
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-text-secondary leading-relaxed max-w-2xl font-light">
               We bridge the gap between human desire and data-driven conversion. 
               Premium architecture for visionary enterprises.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 w-full lg:w-auto">
              <MagneticButton className="px-12 py-6">
                Begin Transformation <ArrowRight className="inline-block ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="space-y-24">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
        >
            <h4 className="text-[10px] mono-accent text-primary">Core Modules</h4>
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-widest">Technological Edge</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Conversion Intelligence", desc: "Engineered revenue pipelines that scale with robotic precision.", icon: <TrendingUp />, label: "Module 01" },
            { title: "Visual Superiority", desc: "Crafting distinct visual worlds that command absolute market attention.", icon: <Star />, label: "Module 02" },
            { title: "Strategic Precision", desc: "Deep analytical audits to identify and exploit market inefficiencies.", icon: <Target />, label: "Module 03" }
          ].map((s, i) => (
            <TiltCard key={i} className="h-[450px] flex flex-col justify-between group">
              <div className="space-y-8">
                <div className="text-[10px] mono-accent opacity-30">{s.label}</div>
                <div className="w-16 h-16 glass flex items-center justify-center border-white/20 group-hover:bg-primary/10 transition-colors">
                  {React.cloneElement(s.icon as React.ReactElement<any>, { className: "w-8 h-8 text-primary" })}
                </div>
                <h3 className="text-3xl font-light tracking-wide uppercase leading-tight">{s.title}</h3>
                <p className="text-text-secondary font-light leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-8 flex items-center justify-between">
                 <div className="text-[10px] mono-accent group-hover:text-primary transition-colors">Learn More</div>
                 <ArrowRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Featured Showcase */}
      <section>
        <TiltCard className="aspect-[21/9] p-0 overflow-hidden relative group border-none">
            <img 
                src={IMAGES.A} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Showcase" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent p-12 md:p-24 flex flex-col justify-end">
                <div className="space-y-6 max-w-3xl">
                    <div className="inline-block px-3 py-1 glass border-white/20 text-[10px] mono-accent">Operational Report 240</div>
                    <h3 className="text-5xl md:text-8xl font-light uppercase tracking-widest text-white leading-none">Hunters Paradise Revenue</h3>
                    <p className="text-white/60 text-lg md:text-2xl font-light max-w-xl italic">+240% Growth in 90 Days // Strategic Domination</p>
                </div>
            </div>
        </TiltCard>
      </section>

      {/* Voices Section */}
      <section className="py-20 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2 space-y-12">
            <h4 className="text-[10px] mono-accent text-accent">Transmission Received</h4>
            <div className="glass-card p-12 md:p-16 border-white/10 relative">
                <Quote className="w-12 h-12 text-primary opacity-20 mb-8" />
                <p className="text-2xl md:text-4xl font-light italic text-text-secondary leading-relaxed">
                  "NexInk didn't just rebuild our digital interface; they redefined our market position. The precision is unmatched."
                </p>
                <div className="flex items-center gap-6 pt-12">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">C</div>
                    <div>
                        <div className="text-lg font-light tracking-widest uppercase">Calvince Okomo</div>
                        <div className="text-[10px] mono-accent opacity-30 mt-1">Sales Lead // Hunters Paradise</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="md:w-1/2 grid grid-cols-2 gap-8">
            {[
                { val: "3.5x", label: "ROI Baseline" },
                { val: "240%", label: "Direct Leads" },
                { val: "10x", label: "Brand Equity" },
                { val: "0.2s", label: "Market Reflex" }
            ].map((stat, i) => (
                <div key={i} className="glass-card p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/20 transition-colors">
                    <div className="text-5xl font-light text-gradient">{stat.val}</div>
                    <div className="text-[10px] mono-accent opacity-30">{stat.label}</div>
                </div>
            ))}
            <div className="col-span-2 glass p-10 flex flex-col items-center justify-center border-white/5 bg-primary/5">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-xl font-light uppercase tracking-widest">Network Expansion</h4>
                <p className="text-text-secondary font-light text-xs mt-2 opacity-60">System status: Limited availability for Q3 protocols.</p>
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pb-48">
        <div className="glass p-16 md:p-32 text-center space-y-16 relative overflow-hidden border-white/10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-2)] opacity-[0.05] blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent-3)] opacity-[0.05] blur-[120px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="space-y-6 relative z-10">
                <h2 className="text-6xl md:text-[8rem] font-light uppercase leading-none tracking-tighter">
                   Initiate <br /><span className="text-gradient">Protocol.</span>
                </h2>
                <p className="text-xl md:text-3xl font-light text-text-secondary max-w-3xl mx-auto">
                    Secure your market transformation intel session today. 
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
                <MagneticButton className="px-16 py-8">
                    Apply for Transform
                </MagneticButton>
                <MagneticButton className="px-16 py-8 !bg-transparent !shadow-none hover:!bg-white/5">
                    Access Intelligence
                </MagneticButton>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
