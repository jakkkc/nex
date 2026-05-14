import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { motion } from 'motion/react';
import { LogIn, Rocket, Shield } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

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
        <div className="text-[30vw] font-display uppercase tracking-widest opacity-[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 select-none">
          SECURE
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-w-xl w-full glass p-10 md:p-20 text-center space-y-12 border-white/20 rounded-[3rem] relative z-10 shadow-3xl"
      >
        <div className="space-y-8">
          <div className="w-20 h-20 bg-primary text-white rounded-[1.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-primary/40 rotate-6 group">
            <Shield className="w-10 h-10 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter">Terminal<br />Access</h1>
            <p className="text-xl md:text-2xl text-text-secondary font-serif italic max-w-sm mx-auto">Tactical Growth Officers Only. Valid identity protocol required.</p>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-3xl shadow-primary/30 group"
        >
          <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 contrast-125" />
          </div>
          Initiate with Google
        </button>

        <div className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">
             NexInk v1.0.42 // Strategic Mastery Hub
          </div>
          <Link to="/" className="text-[9px] font-bold uppercase tracking-widest opacity-40 hover:text-primary transition-colors">
            Abort and return to public interface
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
