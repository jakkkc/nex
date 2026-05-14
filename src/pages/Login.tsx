import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { motion } from 'motion/react';
import { LogIn, Rocket, Shield } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { MagneticButton } from '../components/UI';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="text-[30vw] font-light uppercase tracking-[0.2em] opacity-[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 select-none">
          SYSTEM
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full glass p-12 md:p-24 text-center space-y-16 border-white/5 relative z-10"
      >
        <div className="space-y-10">
          <div className="w-20 h-20 glass border-white/20 text-primary flex items-center justify-center mx-auto rotate-6 group">
            <Shield className="w-10 h-10 group-hover:rotate-12 transition-all" />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light uppercase tracking-widest leading-tight">Identity<br />Protocol</h1>
            <p className="text-text-secondary font-light max-w-sm mx-auto leading-relaxed">Authorized intelligence officers only. Decryption required.</p>
          </div>
        </div>

        <MagneticButton 
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-6"
        >
          <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 contrast-125 grayscale group-hover:grayscale-0 transition-all" />
          </div>
          Initiate Authentication
        </MagneticButton>

        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="text-[10px] mono-accent opacity-30">
             NEXINK SECURE CORE // v2.0.1
          </div>
          <Link to="/" className="text-[10px] mono-accent opacity-50 hover:opacity-100 hover:text-primary transition-all">
            Return to Core Interface
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
