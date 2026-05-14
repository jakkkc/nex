import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Rocket, 
  TrendingUp, 
  Target, 
  Star,
  Quote,
  Users,
  CheckCircle2,
  Store,
  Handshake,
  Home as HomeIcon,
  Zap,
  MousePointer2,
  BarChart3,
  Mail,
  Phone,
  Send,
  Coffee,
  Trees,
  Check,
  ExternalLink
} from 'lucide-react';
import { IMAGES, SOCIAL_LINKS } from '../constants';
import { useMagnetic } from '../hooks/useMagnetic';

const TiltCard: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
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
      
      card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      
      const shineX = (e.clientX - rect.left) / rect.width * 100;
      const shineY = (e.clientY - rect.top) / rect.height * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.08) 0%, transparent 80%)`;
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
      id={id}
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

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" }> = ({ children, className = "", onClick, type = "button" }) => {
    const ref = useMagnetic(0.35);
    return (
        <button 
            ref={ref}
            type={type}
            onClick={onClick}
            className={`glow-border px-8 py-4 text-[11px] mono-accent group active:scale-95 transition-transform ${className}`}
        >
            {children}
        </button>
    );
};

const Home: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="flex flex-col gap-32 md:gap-48 px-4 md:px-8 max-w-7xl mx-auto pb-48 overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center relative pt-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass border-white/10 text-primary text-[10px] mono-accent uppercase tracking-widest">
            <Rocket className="w-4 h-4" /> Average Results: 3.5x ROI | 240% Lead Growth
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-[12vw] md:text-[10rem] font-light uppercase leading-[0.8] tracking-[0.06em]">
            Digital<br />
            <span className="text-gradient font-normal">Aesthetics.</span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-16">
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-text-secondary leading-relaxed max-w-2xl font-light">
               We bridge the gap between human desire and data-driven conversion. 
               Premium architecture for visionary enterprises.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 w-full lg:w-auto">
              <a href="#contact">
                <MagneticButton className="px-12 py-6">
                  Get Free Audit <ArrowRight className="inline-block ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Orbiting Logo Background */}
        <div className="absolute right-[-10%] top-[40%] hidden lg:block opacity-20 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] border border-white/5 rounded-full flex items-center justify-center"
          >
            <div className="w-[600px] h-[600px] border border-white/5 rounded-full" />
            <div className="w-[400px] h-[400px] border border-white/5 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { val: "3.5x", label: "ROI Baseline" },
          { val: "240%", label: "Lead Growth" },
          { val: "742%", label: "Engagement" },
          { val: "30 Days", label: "To Results" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center space-y-4 border-white/5"
          >
            <div className="text-4xl md:text-6xl font-light text-gradient">{stat.val}</div>
            <div className="text-[10px] mono-accent opacity-40 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Services Section */}
      <section id="services" className="space-y-24 scroll-mt-32">
        <div className="text-center space-y-4">
            <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">Strategic Modules</h4>
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter">Revenue-Focused Services</h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-light">Conversion tracking, A/B testing, and monthly ROI reports integrated into every core module.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Social Conversion", 
              desc: "Full funnel strategy: Awareness → Consideration → Conversion. We manage everything from content to acquisition.", 
              icon: <TrendingUp />, 
              price: "Kes.30,000 / mo",
              features: ["Lead Gen Campaigns", "Sales-Focused Content", "Conversion Tracking", "Monthly ROI Reports"]
            },
            { 
              title: "Conversion Design", 
              desc: "High-converting visuals for ads, landing pages, and social. Optimized for maximum engagement.", 
              icon: <MousePointer2 />, 
              price: "Kes.10,000 / proj",
              features: ["Ad Optimization", "Landing Page Architecture", "Sales Collateral", "A/B Testing Included"]
            },
            { 
              title: "Performance Intel", 
              desc: "Actionable market intelligence. Real-time dashboards and competitor benchmarks to scale what works.", 
              icon: <BarChart3 />, 
              price: "Kes.25,000 / mo",
              features: ["Live KPI Dashboards", "Market Intelligence", "Weekly Optimization", "ROI Forecasting"]
            }
          ].map((s, i) => (
            <TiltCard key={i} className="min-h-[500px] flex flex-col justify-between group p-10">
              <div className="space-y-8">
                <div className="w-16 h-16 glass flex items-center justify-center border-white/10 group-hover:bg-primary/10 transition-colors">
                  {React.cloneElement(s.icon as React.ReactElement<any>, { className: "w-8 h-8 text-primary" })}
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-light uppercase tracking-tight">{s.title}</h3>
                  <div className="text-primary text-[10px] mono-accent">{s.price}</div>
                </div>
                <p className="text-text-secondary font-light text-sm leading-relaxed">{s.desc}</p>
                
                <ul className="space-y-3 pt-4">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-[10px] mono-accent opacity-60">
                      <CheckCircle2 className="w-3 h-3 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-10">
                 <a href="#contact">
                  <button className="w-full py-4 glass border-white/5 text-[10px] mono-accent uppercase tracking-widest hover:bg-white/5 transition-all">Secure Module</button>
                 </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Industries Section */}
      <section className="space-y-20 py-20 bg-white/[0.02] rounded-[60px] p-8 md:p-20 border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tight">Broad Spectrum <br /><span className="text-gradient">Domination.</span></h2>
            <p className="text-text-secondary font-light text-lg">My strategies are tailored to your specific business model and goals. I adapt proven frameworks to any industry footprint.</p>
          </div>
          <div className="glass p-6 border-primary/20">
            <div className="text-[10px] mono-accent text-primary uppercase">Industry Versatility Index</div>
            <div className="text-4xl font-light mt-2 uppercase tracking-widest">99.9%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Retail & Ecom", icon: <Store />, roi: "4.2x Avg ROI", desc: "Shoppable content and retargeting systems." },
            { title: "B2B & Services", icon: <Handshake />, roi: "3.8x Avg ROI", desc: "LinkedIn strategy and lead generation." },
            { title: "Real Estate", icon: <HomeIcon />, roi: "5.1x Avg ROI", desc: "Visual storytelling and local dominance." },
            { title: "Startups & Tech", icon: <Rocket />, roi: "6.3x Avg ROI", desc: "Rapid acquisition and growth hacking." }
          ].map((ind, i) => (
            <div key={i} className="glass p-10 space-y-6 border-white/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {React.cloneElement(ind.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-light uppercase tracking-widest">{ind.title}</h4>
                <div className="bg-primary/10 text-primary text-[8px] mono-accent px-2 py-1 inline-block rounded-full">{ind.roi}</div>
              </div>
              <p className="text-text-secondary text-xs font-light leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="space-y-24 scroll-mt-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">Strategic Deployments</h4>
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter">Client Portfolio</h2>
          </div>
          <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="glass px-8 py-4 text-[10px] mono-accent uppercase border-white/5 hover:bg-white/5 transition-all">Examine Full Archive</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              name: "Coffee Garden Suites", 
              icon: <Coffee />, 
              desc: "Social media management, content creation, and growth strategy for boutique accommodation.",
              link: "https://instagram.com/coffeegardensuites"
            },
            { 
              name: "Hunters Paradise Cottages", 
              icon: <Trees />, 
              desc: "Full digital marketing management including social media, content creation, and performance analytics.",
              link: "https://instagram.com/huntersparadisecottages"
            },
            { 
              name: "Hunters Paradise Tuuti", 
              icon: <Zap />, 
              desc: "Strategic social media campaigns, engagement optimization, and brand visibility expansion.",
              link: "https://instagram.com/huntersparadisetuuti"
            }
          ].map((client, i) => (
            <TiltCard key={i} className="group p-1">
              <div className="glass h-full p-10 space-y-8 flex flex-col justify-between border-transparent group-hover:border-primary/10 transition-all">
                <div className="space-y-8">
                  <div className="w-16 h-16 glass flex items-center justify-center text-primary border-white/10 group-hover:bg-primary/10 transition-colors">
                    {React.cloneElement(client.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-3xl font-light uppercase tracking-tight leading-none">{client.name}</h3>
                  <p className="text-text-secondary font-light text-sm leading-relaxed opacity-60">{client.desc}</p>
                </div>
                <div className="pt-10 flex gap-4">
                   <a 
                    href={client.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-10 h-10 glass flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
                   >
                     <ExternalLink className="w-4 h-4" />
                   </a>
                   <div className="w-10 h-10 glass flex items-center justify-center opacity-40">
                     <TrendingUp className="w-4 h-4" />
                   </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="scroll-mt-32">
        <TiltCard className="p-0 border-none relative overflow-hidden bg-white/[0.03]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-24 space-y-16">
              <div className="space-y-6">
                <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">The Framework</h4>
                <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-none text-white">ROI-Driven <br /><span className="text-gradient">Framework.</span></h2>
                <p className="text-text-secondary font-light text-lg">Every strategy is built on this proven 4-part conversion engine that guarantees measurable results.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { title: "Analyze", label: "Audit & Strategy", desc: "Market analysis and competitor benchmarking." },
                  { title: "Convert", label: "Content That Sells", desc: "Psychology-backed content optimized for action." },
                  { title: "Optimize", label: "Data Adjustments", desc: "Real-time analytics and continuous improvement." },
                  { title: "Scale", label: "Growth Expansion", desc: "Systematic scaling of proven strategies." }
                ].map((m, i) => (
                  <div key={i} className="space-y-4">
                    <div className="text-primary font-black text-2xl uppercase tracking-widest">{m.title}</div>
                    <div className="text-[10px] mono-accent opacity-40 uppercase">{m.label}</div>
                    <p className="text-text-secondary text-xs font-light leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
               <img src={IMAGES.B} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" alt="Strategy" />
               <div className="absolute inset-0 bg-gradient-to-r from-bg to-transparent lg:from-transparent" />
            </div>
          </div>
        </TiltCard>
      </section>

      {/* Process Section */}
      <section className="space-y-24 py-20">
        <div className="text-center space-y-4">
            <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">Chronology</h4>
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter">Your Path to Results</h2>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Discovery & Audit", desc: "Free 30-minute audit of your current digital presence. We identify gaps, opportunities, and define clear conversion goals." },
            { step: "02", title: "Strategy & Setup", desc: "Custom conversion strategy development. We set up tracking, KPIs, and launch your optimized presence in 7 days." },
            { step: "03", title: "Execution & Optimization", desc: "Daily management with weekly performance reviews. We constantly test and optimize for maximum ROI." },
            { step: "04", title: "Scale & Report", desc: "Monthly ROI reports and strategy scaling. We double down on what works and expand your reach systematically." }
          ].map((proc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-12 items-start group"
            >
              <div className="text-7xl md:text-9xl font-light text-primary/10 group-hover:text-primary transition-colors leading-none select-none">{proc.step}</div>
              <div className="space-y-4 pt-4 md:pt-10">
                <h3 className="text-3xl md:text-5xl font-light uppercase tracking-widest">{proc.title}</h3>
                <p className="text-text-secondary font-light text-lg max-w-xl">{proc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2 space-y-12">
            <h4 className="text-[10px] mono-accent text-accent">Transmission Received</h4>
            <div className="glass-card p-12 md:p-16 border-white/10 relative">
                <Quote className="w-12 h-12 text-primary opacity-20 mb-8" />
                <p className="text-2xl md:text-3xl font-light italic text-text-secondary leading-relaxed">
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

        <div className="md:w-1/2 space-y-16">
            <div className="glass-card p-12 md:p-16 border-white/10 relative mt-12 md:mt-24">
                <Quote className="w-12 h-12 text-accent opacity-20 mb-8" />
                <p className="text-2xl md:text-3xl font-light italic text-text-secondary leading-relaxed">
                  "The conversion-focused design increased our CTR by 180%. Jackson doesn't just make things look good—he makes them convert."
                </p>
                <div className="flex items-center gap-6 pt-12">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black">E</div>
                    <div>
                        <div className="text-lg font-light tracking-widest uppercase">Edgar Kinyanjui</div>
                        <div className="text-[10px] mono-accent opacity-30 mt-1">Managing Partner // Coffee Garden Suites</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-32">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1 space-y-12">
            <div className="space-y-6 text-center lg:text-left">
               <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">The Architect</h4>
               <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter text-white">Jackson <br /><span className="text-gradient">Mwaniki.</span></h2>
            </div>
            <div className="space-y-8 text-text-secondary font-light text-lg leading-relaxed text-center lg:text-left">
              <p>I don't do "likes and follows." I build conversion engines that drive revenue.</p>
              <p>With a background in data science and digital marketing, I combine creative execution with hard analytics. Every decision is backed by data. Every campaign is optimized for ROI.</p>
              <div className="p-8 glass border-primary/20 italic">
                "You'll see measurable business results within 30 days, or we adjust until you do. No excuses."
              </div>
            </div>
            <div className="flex justify-center lg:justify-start gap-8">
               <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="w-12 h-12 glass flex items-center justify-center hover:text-primary transition-colors">
                 <ArrowRight className="w-5 h-5 -rotate-45" />
               </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <TiltCard className="w-full max-w-md aspect-[3/4] p-0 border-none group">
               <img src={IMAGES.C} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Jackson Mwaniki" />
               <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-32 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="space-y-16">
              <div className="space-y-6">
                <h4 className="text-[10px] mono-accent text-primary uppercase tracking-[0.4em]">Protocol Expansion</h4>
                <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter">Initiate <br /><span className="text-gradient">Intel.</span></h2>
                <p className="text-text-secondary text-xl font-light">Limited to 5 growth audit slots per week. Secure your position in the Q3 queue.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 glass flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-[10px] mono-accent opacity-40 uppercase tracking-widest">Direct Frequency</div>
                     <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} className="text-xl font-light hover:text-primary transition-colors">{SOCIAL_LINKS.EMAIL}</a>
                   </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 glass flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-[10px] mono-accent opacity-40 uppercase tracking-widest">Voice Protocol</div>
                     <a href={`tel:${SOCIAL_LINKS.PHONE}`} className="text-xl font-light hover:text-primary transition-colors">{SOCIAL_LINKS.PHONE}</a>
                   </div>
                </div>
              </div>
           </div>

           <div className="glass p-10 md:p-16 border-white/5 relative bg-white/[0.01]">
             {formStatus === 'success' ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
               >
                 <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-primary border-primary/20">
                    <Check className="w-12 h-12" />
                 </div>
                 <div className="space-y-4">
                   <h3 className="text-4xl font-light uppercase tracking-widest">Transmission Successful</h3>
                   <p className="text-text-secondary font-light">Your growth audit application has been queued. Frequency response within 4 hours.</p>
                 </div>
                 <button onClick={() => setFormStatus('idle')} className="text-[10px] mono-accent uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Reset Frequency</button>
               </motion.div>
             ) : (
               <form onSubmit={handleFormSubmit} className="space-y-10">
                 <div className="space-y-8">
                   <div className="space-y-2">
                     <label className="text-[10px] mono-accent opacity-40 uppercase tracking-widest ml-1">Identity Name</label>
                     <input required className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-light text-xl focus:border-primary outline-none transition-all" placeholder="Enter Full Name" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] mono-accent opacity-40 uppercase tracking-widest ml-1">Target Email</label>
                     <input required type="email" className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-light text-xl focus:border-primary outline-none transition-all" placeholder="business@protocol.com" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] mono-accent opacity-40 uppercase tracking-widest ml-1">Enterprise Domain</label>
                     <input required className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-light text-xl focus:border-primary outline-none transition-all" placeholder="Industry sector" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] mono-accent opacity-40 uppercase tracking-widest ml-1">Primary Objective</label>
                     <select required className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-light text-xl focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                       <option value="" className="bg-bg">Select Goal</option>
                       <option value="leads" className="bg-bg">Lead Generation</option>
                       <option value="sales" className="bg-bg">Sales Conversion</option>
                       <option value="awareness" className="bg-bg">Market Presence</option>
                       <option value="scale" className="bg-bg">Growth Scaling</option>
                     </select>
                   </div>
                 </div>

                 <MagneticButton type="submit" className="w-full py-8 text-sm tracking-[0.2em]" onClick={() => {}}>
                    {formStatus === 'submitting' ? 'Transmitting...' : 'Apply for Intel Audit'} <Send className="w-4 h-4 inline-block ml-4" />
                 </MagneticButton>
                 
                 <p className="text-center text-[10px] mono-accent opacity-30 uppercase tracking-widest">System integrity verified. Encryption active.</p>
               </form>
             )}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
