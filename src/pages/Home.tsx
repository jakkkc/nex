import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  MessageSquare, 
  Rocket, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Users,
  Zap,
  Star,
  Quote
} from 'lucide-react';
import { IMAGES, SOCIAL_LINKS } from '../constants';

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } as any
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="flex flex-col gap-24 md:gap-48 px-4 md:px-8 max-w-7xl mx-auto pb-48">
      {/* Dynamic Hero */}
      <section className="min-h-[80vh] md:min-h-screen flex flex-col justify-center relative pt-20">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-primary/5 to-transparent">
            <motion.div 
              style={{ y, rotateZ: 5 }}
              className="text-[30vw] md:text-[20vw] font-display uppercase leading-[0.7] opacity-[0.02] dark:opacity-[0.04] absolute top-10 left-0 whitespace-nowrap select-none"
            >
              STRATEGY PERFORMANCE
            </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8 md:space-y-12 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass text-primary text-[10px] md:text-xs font-black tracking-[0.4em] uppercase border-white/20">
            <Rocket className="w-4 h-4 animate-bounce" /> Tactical Mastery
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-[16vw] sm:text-[14vw] md:text-[11rem] font-display uppercase leading-[0.8] tracking-tighter">
            Build <span className="italic font-serif font-light text-text-secondary">Legacy.</span><br />
            <span className="text-gradient">Dominance.</span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 md:gap-16">
            <motion.p variants={itemVariants} className="text-lg md:text-3xl text-text-secondary leading-tight max-w-2xl font-medium tracking-tight">
              We turn social stagnation into aggressive growth. 
              Data-backed design for the elite business architect.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 w-full lg:w-auto">
              <button className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-primary text-white rounded-2xl font-black text-lg md:text-xl hover:rotate-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 group overflow-hidden">
                Audit My Growth <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3D Reactive Image Showcase */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group rounded-[3rem] md:rounded-[5rem] overflow-hidden glass border-none aspect-[4/5] md:aspect-[21/9]"
        >
          <img 
            src={IMAGES.A} 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
            alt="Hero Visual" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-20 flex flex-col justify-end">
            <div className="max-w-2xl space-y-4 md:space-y-8">
              <div className="inline-block px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-2xl">Case Study 01</div>
              <h3 className="text-4xl md:text-8xl font-display uppercase text-white leading-none tracking-tighter">Hunters Paradise Revenue Engine</h3>
              <p className="text-white/70 text-lg md:text-2xl font-medium max-w-lg">+240% Growth in 90 Days</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* High-Contrast Bento Pipeline */}
      <section id="services" className="space-y-16">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 border-l-4 border-primary pl-6">
          <h2 className="text-7xl md:text-[10rem] font-display uppercase leading-none tracking-tighter">The<br />Pipeline</h2>
          <p className="text-lg md:text-2xl text-text-secondary font-medium font-serif italic max-w-sm mb-2 md:mb-4">Our systematic process for total market capture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            { title: "Revenue Conversion", desc: "Acquire customers at scale. We design the machines that build your wealth.", price: "30k", feat: "Lead Engines", icon: <TrendingUp /> },
            { title: "Bespoke Creative", desc: "Design that stops the scroll. Force engagement through visual superiority.", price: "15k", feat: "Visual Assets", icon: <Star /> },
            { title: "Strategic Intel", desc: "Real-time analytics that tell you exactly where to scale for maximum profit.", price: "25k", feat: "Deep Audit", icon: <Target /> }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -15 }}
              className="glass-card flex flex-col justify-between group hover:bg-primary/5 transition-all h-[400px] md:h-[500px]"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {React.cloneElement(s.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-3xl md:text-4xl font-black leading-tight uppercase">{s.title}</h3>
                <p className="text-text-secondary text-lg leading-relaxed font-medium">{s.desc}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">{s.feat}</span>
                </div>
              </div>
              <div className="pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="text-2xl font-black">K. {s.price} <span className="text-xs opacity-40">/mo</span></div>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof with High-End Layout */}
      <section className="py-20 space-y-24">
        <h2 className="text-[15vw] md:text-[12rem] font-display uppercase tracking-tighter opacity-10 leading-none">Voices</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center -mt-20">
           <div className="space-y-12">
              <div className="glass-card border-none shadow-3xl space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 text-[12rem] font-serif leading-none opacity-5 -translate-y-12 translate-x-12">"</div>
                 <Quote className="w-12 h-12 text-primary opacity-20" />
                 <p className="text-2xl md:text-4xl font-serif italic text-text-secondary leading-tight md:leading-relaxed">
                   "Jackson didn't just rebuild our social presence; he rebuilt our business model. 3.5x ROI isn't a goal anymore, it's our baseline."
                 </p>
                 <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary">C</div>
                    <div>
                      <div className="font-black text-lg">Calvince Okomo</div>
                      <div className="text-xs font-black uppercase tracking-widest opacity-40">Sales Lead // Hunters Paradise</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-8 text-center space-y-4">
                 <div className="text-5xl font-black text-primary">3.5x</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-40">ROI Increase</div>
              </div>
              <div className="glass-card p-8 text-center space-y-4">
                 <div className="text-5xl font-black text-accent">240%</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Lead Growth</div>
              </div>
              <div className="col-span-2 glass-card p-10 flex flex-col items-center justify-center border-dashed border-primary/40 bg-primary/5">
                 <Users className="w-12 h-12 text-primary mb-4" />
                 <h4 className="text-2xl font-black uppercase">Join the Elite 1%</h4>
                 <p className="text-text-secondary font-medium mt-2">Only 2 spots remaining for Q3.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="pb-24">
        <div className="glass-card bg-primary text-white p-12 md:p-32 rounded-[4rem] text-center space-y-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <h2 className="text-6xl md:text-[10rem] font-display uppercase leading-[0.8] tracking-tighter relative z-10">Start Your<br /><span className="text-white/50 italic font-serif font-light">Dominance.</span></h2>
          <p className="text-xl md:text-3xl font-medium max-w-2xl mx-auto opacity-90 relative z-10">
            Book a 30-minute growth intel session. No fluff. Full transparency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
             <button className="px-12 py-6 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-3xl flex items-center justify-center gap-3">
               Apply Now <ArrowRight className="w-6 h-6" />
             </button>
             <button className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xl hover:bg-white/20 transition-all">
               View Pipeline
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
