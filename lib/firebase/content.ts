'use client';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client';
import type { ArtistProfile, HomepageContent, Work } from '@/lib/content-types';

const worksCollection = collection(firestore, 'works');

function asWork(id: string, data: Record<string, unknown>): Work {
  return {
    id,
    slug: String(data.slug ?? id),
    title: String(data.title ?? 'Untitled'),
    year: String(data.year ?? ''),
    medium: String(data.medium ?? ''),
    description: String(data.description ?? ''),
    image: String(data.image ?? ''),
    imageAlt: String(data.imageAlt ?? data.title ?? 'Artwork'),
    status: data.status === 'published' ? 'published' : 'draft',
    sortOrder: Number(data.sortOrder ?? 0),
  };
}

export async function getPublishedWorks() {
  const snapshot = await getDocs(query(worksCollection, where('status', '==', 'published')));
  return snapshot.docs.map((item) => asWork(item.id, item.data())).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAdminWorks() {
  const snapshot = await getDocs(worksCollection);
  return snapshot.docs.map((item) => asWork(item.id, item.data())).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveWork(work: Omit<Work, 'id'>, id?: string) {
  const payload = { ...work, updatedAt: serverTimestamp() };
  if (id) {
    await updateDoc(doc(firestore, 'works', id), payload);
    return id;
  }
  const created = await addDoc(worksCollection, { ...payload, createdAt: serverTimestamp() });
  return created.id;
}

export async function removeWork(id: string) {
  await deleteDoc(doc(firestore, 'works', id));
}

export async function reorderWorks(works: Work[]) {
  await Promise.all(works.map((work, index) => updateDoc(doc(firestore, 'works', work.id), { sortOrder: index, updatedAt: serverTimestamp() })));
}

export async function getArtistProfile() {
  const snapshot = await getDoc(doc(firestore, 'artist', 'profile'));
  return snapshot.exists() ? (snapshot.data() as ArtistProfile) : null;
}

export async function saveArtistProfile(profile: ArtistProfile) {
  await setDoc(doc(firestore, 'artist', 'profile'), { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getHomepageContent() {
  const snapshot = await getDoc(doc(firestore, 'homepage', 'current'));
  return snapshot.exists() ? (snapshot.data() as HomepageContent) : null;
}

export async function saveHomepageContent(content: HomepageContent) {
  await setDoc(doc(firestore, 'homepage', 'current'), { ...content, updatedAt: serverTimestamp() }, { merge: true });
}
