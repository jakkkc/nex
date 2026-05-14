import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Loader2, Rocket, TrendingUp } from 'lucide-react';
import { getPosts, Post } from '../services/blogService';
import { format } from 'date-fns';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.filter(p => p.status === 'published'));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-24">
      <header className="space-y-12">
        <div className="inline-flex items-center gap-3 px-4 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
          <TrendingUp className="w-4 h-4" /> Market Intelligence
        </div>
        <h1 className="text-7xl md:text-[10rem] font-display uppercase leading-[0.8] tracking-tighter max-w-4xl">
          Growth <span className="text-gradient">Intel.</span>
        </h1>
        <p className="text-xl md:text-3xl text-text-secondary max-w-2xl font-serif italic">
          Tactical breakdowns of market shifts and conversion frameworks.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="glass-card text-center py-32">
          <p className="text-2xl font-black opacity-30 uppercase tracking-[0.2em]">The intellectual vault is being primed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full">
                <div className="glass-card flex flex-col h-full border-none p-0 overflow-hidden group-hover:bg-primary/5 transition-all">
                  <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    {post.coverImage ? (
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-primary opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                        <span>{format(post.createdAt.toDate(), 'MMM dd, yyyy')}</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md">Protocol</span>
                      </div>
                      <h2 className="text-3xl font-black leading-none uppercase group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Read Protocol</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
