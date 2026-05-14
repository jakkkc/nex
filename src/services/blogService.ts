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
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
  
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) } as Post))
      .filter(post => {
        if (isAdmin) return true;
        if (post.status === 'published') return true;
        if (post.status === 'scheduled' && post.scheduledAt && post.scheduledAt.toMillis() <= now.toMillis()) return true;
        return false;
      });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION);
    return [];
  }
};

export const getPost = async (id: string) => {
  const docRef = doc(db, COLLECTION, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as object) } as Post;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${COLLECTION}/${id}`);
    return null;
  }
};

export const createPost = async (post: Partial<Post>) => {
  const now = serverTimestamp();
  const data = {
    ...(post as any),
    createdAt: now,
    updatedAt: now,
    publishedAt: post.status === 'published' ? now : null
  };
  try {
    return await addDoc(collection(db, COLLECTION), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION);
  }
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  try {
    return await updateDoc(doc(db, COLLECTION, id), {
      ...(post as any),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION}/${id}`);
  }
};

export const deletePost = async (id: string) => {
  try {
    return await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION}/${id}`);
  }
};
