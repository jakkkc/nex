import React, { useRef, useEffect } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
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

export const MagneticButton: React.FC<{ 
    children: React.ReactNode; 
    className?: string; 
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
}> = ({ children, className = "", onClick, type = "button" }) => {
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
