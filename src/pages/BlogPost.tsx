import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, Loader2, Share2, Rocket } from 'lucide-react';
import { getPost, Post } from '../services/blogService';
import { IMAGES } from '../constants';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[var(--accent-1)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">404 Intel Missing</h1>
        <p className="text-xl text-text-secondary font-serif italic">This tactical target has been moved or deactivated.</p>
        <Link to="/blog" className="px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-24 space-y-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
      </Link>

      <header className="space-y-12">
        <div className="space-y-6">
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary">
              <span className="px-2 py-1 bg-primary/10 rounded-md">Protocol Hub</span>
              <span>•</span>
              <span className="opacity-40">{format(post.createdAt.toDate(), 'MMMM dd, yyyy')}</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-display uppercase leading-[0.9] tracking-tighter">
             {post.title}
           </h1>
           <p className="text-xl md:text-3xl text-text-secondary font-serif italic leading-relaxed">
             {post.excerpt}
           </p>
        </div>

        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden glass border-none shadow-2xl">
          <img src={post.coverImage || IMAGES.A} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </header>

      <div className="glass-card border-none p-10 md:p-16">
        <div className="prose prose-xl prose-zinc dark:prose-invert max-w-none font-medium text-lg md:text-xl leading-loose tracking-tight selection:bg-primary/30">
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      <footer className="pt-16 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xl shadow-inner">
              {post.authorName[0]}
            </div>
            <div>
              <div className="font-black text-lg">{post.authorName}</div>
              <div className="text-xs font-black uppercase tracking-widest opacity-40">Growth Specialist</div>
            </div>
         </div>
         <div className="flex gap-4">
           <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all border-none">
             <Share2 className="w-6 h-6" />
           </button>
           <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30">
             Next Intel <ArrowLeft className="w-4 h-4 rotate-180" />
           </button>
         </div>
      </footer>
    </article>
  );
};

export default BlogPost;
