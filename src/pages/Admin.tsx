import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  X, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getPosts, createPost, updatePost, deletePost, Post } from '../services/blogService';
import { auth, storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { format } from 'date-fns';
import { IMAGES } from '../constants';
import { MagneticButton, TiltCard } from '../components/UI';

const Admin: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(true);
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'cover' | 'media') => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setEditingPost(prev => ({
        ...prev,
        [type === 'cover' ? 'coverImage' : 'mediaUrl']: url,
        ...(type === 'media' ? { mediaType: file.type.startsWith('video') ? 'video' : 'image' } : {})
      } as any));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPost?.title || !editingPost?.content) return;
    
    const postData = {
      ...editingPost,
      authorId: user?.uid,
      authorName: user?.displayName || 'Admin Officer',
      excerpt: editingPost.excerpt || editingPost.content?.substring(0, 150) + '...',
      tags: typeof editingPost.tags === 'string' ? (editingPost.tags as string).split(',').map(t => t.trim()) : (editingPost.tags || []),
    };

    try {
      if (editingPost.id) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost({
          ...postData,
          status: postData.status || 'draft',
        });
      }
      setIsEditorOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanent destruction of this intelligence protocol?')) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate('/');
  };

  if (authLoading || (loading && posts.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-16">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
        <div className="space-y-6 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 glass border-white/10 text-primary text-[10px] mono-accent"
          >
            <ShieldCheck className="w-4 h-4" /> Root Terminal
          </motion.div>
          <h1 className="text-7xl md:text-[8rem] font-light uppercase leading-[0.8] tracking-[0.06em]">
             Strategic <span className="text-gradient">Hub.</span>
          </h1>
          <p className="text-xl text-text-secondary font-light">Operational command for NexInk tactical dispatch.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <MagneticButton 
            onClick={() => {
              setEditingPost({ status: 'draft', tags: [] });
              setIsEditorOpen(true);
            }}
            className="flex-1 md:flex-none px-10 py-5"
          >
            <Plus className="w-5 h-5 inline-block mr-2" /> Launch Protocol
          </MagneticButton>
          <button 
            onClick={handleSignOut}
            className="px-8 py-5 glass text-text text-[11px] mono-accent uppercase hover:bg-white/5 transition-colors"
          >
            Abort
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Dispatch Log", value: posts.length, color: "text-primary", icon: <Rocket /> },
          { label: "Active Ops", value: posts.filter(p => p.status === 'published').length, color: "text-primary", icon: <TrendingUp /> },
          { label: "Draft Frameworks", value: posts.filter(p => p.status === 'draft').length, color: "text-accent", icon: <Edit3 /> },
          { label: "Integrity", value: "DEEP", color: "text-primary", icon: <ShieldCheck /> },
        ].map((stat, i) => (
          <TiltCard key={i} className="p-10 flex flex-col justify-center border-none">
            <div className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
              {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
            </div>
            <div className={`text-4xl md:text-5xl font-light ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] mono-accent opacity-40 mt-1">{stat.label}</div>
          </TiltCard>
        ))}
      </div>

      <div className="space-y-12">
        <h2 className="text-[10px] mono-accent opacity-30">Intelligence Stream</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <TiltCard key={post.id} className="flex flex-col md:flex-row items-center gap-8 border-none !p-6 md:!p-8 hover:bg-white/5 transition-all">
               <div className="w-full md:w-28 aspect-square overflow-hidden glass border-none">
                  <img src={post.coverImage || IMAGES.B} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
               </div>
               <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] mono-accent opacity-40">
                     <span>{format(post.createdAt.toDate(), 'MMM dd, yyyy')}</span>
                     <span className={`${post.status === 'published' ? 'text-primary' : 'text-accent'}`}>{post.status}</span>
                  </div>
                  <h3 className="text-3xl font-light uppercase leading-none tracking-tight">{post.title}</h3>
                  <p className="text-text-secondary text-sm font-light line-clamp-1">{post.excerpt}</p>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => {
                      setEditingPost(post);
                      setIsEditorOpen(true);
                    }}
                    className="flex-1 md:flex-none p-5 glass hover:bg-primary/20 transition-all border-none"
                  >
                    <Edit3 className="w-5 h-5 mx-auto" />
                  </button>
                  <button 
                    onClick={() => post.id && handleDelete(post.id)}
                    className="flex-1 md:flex-none p-5 glass hover:bg-pink/20 transition-all border-none"
                  >
                    <Trash2 className="w-5 h-5 mx-auto" />
                  </button>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="flex-1 md:flex-none p-5 glass hover:bg-primary/20 transition-all border-none"
                  >
                    <ChevronRight className="w-5 h-5 mx-auto" />
                  </Link>
               </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsEditorOpen(false)}
               className="absolute inset-0 bg-bg/80 backdrop-blur-md"
             />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] glass border-white/20 rounded-[3rem] p-4 flex flex-col shadow-3xl relative"
            >
              <div className="p-8 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                <h2 className="text-3xl font-display uppercase tracking-tighter">{editingPost?.id ? 'Refine Protocol' : 'Initial Dispatch'}</h2>
                <button onClick={() => setIsEditorOpen(false)} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Objective Title</label>
                  <input 
                    type="text" 
                    value={editingPost?.title || ''}
                    onChange={e => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary rounded-2xl px-6 py-4 text-xl font-black outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Hero Asset</label>
                    <div className="relative aspect-video rounded-[2rem] border-2 border-dashed border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden group">
                      {editingPost?.coverImage ? (
                        <>
                          <img src={editingPost.coverImage} className="w-full h-full object-cover" alt="Cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-white font-bold flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Change</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center space-y-2 opacity-40">
                           <ImageIcon className="w-10 h-10 mx-auto" />
                           <div className="text-[10px] font-bold uppercase tracking-widest">Select Image Asset</div>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'cover')}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Strategic Deployment</label>
                     <div className="space-y-4">
                        <select 
                          value={editingPost?.status || 'draft'}
                          onChange={e => setEditingPost(prev => ({ ...prev, status: e.target.value as any }))}
                          className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary rounded-2xl px-6 py-4 outline-none transition-all font-black text-xs uppercase tracking-widest appearance-none"
                        >
                          <option value="draft">STAGING (Draft)</option>
                          <option value="published">DEPLOYED (Active)</option>
                        </select>
                        <input 
                          type="text" 
                          value={Array.isArray(editingPost?.tags) ? editingPost.tags.join(', ') : (editingPost?.tags || '')}
                          onChange={e => setEditingPost(prev => ({ ...prev, tags: e.target.value as any }))}
                          className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary rounded-2xl px-6 py-4 outline-none transition-all font-bold placeholder:opacity-40"
                          placeholder="Tags (Comma separated)"
                        />
                     </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Intel Content (Markdown)</label>
                  <textarea 
                    value={editingPost?.content || ''}
                    onChange={e => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full min-h-[400px] bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary rounded-2xl px-6 py-6 outline-none font-mono text-sm leading-relaxed"
                  />
                </div>
              </div>

              <div className="p-8 border-t border-black/5 dark:border-white/5 flex justify-end gap-6">
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-8 font-black uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                >
                  Discard Package
                </button>
                <button 
                  onClick={handleSave}
                  disabled={uploading || !editingPost?.title || !editingPost?.content}
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-3xl shadow-primary/40 disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />}
                  {editingPost?.id ? 'Synchronize' : 'Initiate Dispatch'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
