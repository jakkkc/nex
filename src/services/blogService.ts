import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Post {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  authorId: string;
  authorName: string;
  publishedAt: Timestamp;
  scheduledAt?: Timestamp;
  status: 'draft' | 'published' | 'scheduled';
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION = 'posts';

export const getPosts = async (isAdmin = false) => {
  const now = Timestamp.now();
  let q;
  
  if (isAdmin) {
    q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  } else {
    // Only published and scheduled posts
    q = query(
      collection(db, COLLECTION),
      where('status', 'in', ['published', 'scheduled']),
      orderBy('createdAt', 'desc')
    );
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) } as Post))
    .filter(post => {
      if (isAdmin) return true;
      if (post.status === 'published') return true;
      if (post.status === 'scheduled' && post.scheduledAt && post.scheduledAt.toMillis() <= now.toMillis()) return true;
      return false;
    });
};

export const getPost = async (id: string) => {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as object) } as Post;
  }
  return null;
};

export const createPost = async (post: Partial<Post>) => {
  const now = serverTimestamp();
  const data = {
    ...(post as any),
    createdAt: now,
    updatedAt: now,
    publishedAt: post.status === 'published' ? now : null
  };
  return await addDoc(collection(db, COLLECTION), data);
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  return await updateDoc(doc(db, COLLECTION, id), {
    ...(post as any),
    updatedAt: serverTimestamp()
  });
};

export const deletePost = async (id: string) => {
  return await deleteDoc(doc(db, COLLECTION, id));
};
