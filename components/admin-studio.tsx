'use client';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import type { ArtistProfile, HomepageContent, Work } from '@/lib/content-types';
import { firebaseAuth } from '@/lib/firebase/client';
import { getAdminWorks, getArtistProfile, getHomepageContent, removeWork, reorderWorks, saveArtistProfile, saveHomepageContent, saveWork } from '@/lib/firebase/content';

const emptyWork: Omit<Work, 'id'> = { slug: '', title: '', year: '', medium: '', description: '', image: '', imageAlt: '', status: 'draft', sortOrder: 0 };
const emptyArtist: ArtistProfile = { name: 'K', statement: { ko: '', en: '' }, biography: { ko: '', en: '' } };
const emptyHomepage: HomepageContent = { heroKicker: { ko: '', en: '' }, heroTitle: { ko: '', en: '' }, heroBody: { ko: '', en: '' }, published: false };

function errorText(error: unknown) {
  return error instanceof Error ? error.message : 'The requested Firebase operation could not be completed.';
}

export function AdminStudio() {
  const [user, setUser] = useState<User | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [draft, setDraft] = useState<Omit<Work, 'id'>>(emptyWork);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [artist, setArtist] = useState<ArtistProfile>(emptyArtist);
  const [homepage, setHomepage] = useState<HomepageContent>(emptyHomepage);
  const [message, setMessage] = useState('Sign in to load the protected content studio.');
  const [busy, setBusy] = useState(false);

  useEffect(() => onAuthStateChanged(firebaseAuth, setUser), []);

  async function loadStudio() {
    setBusy(true);
    try {
      const [nextWorks, nextArtist, nextHomepage] = await Promise.all([getAdminWorks(), getArtistProfile(), getHomepageContent()]);
      setWorks(nextWorks);
      if (nextArtist) setArtist(nextArtist);
      if (nextHomepage) setHomepage(nextHomepage);
      setMessage('Content loaded from Firestore.');
    } catch (error) {
      setMessage(`Access is not yet granted: ${errorText(error)}`);
    } finally { setBusy(false); }
  }

  async function signIn() {
    setBusy(true);
    try {
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      await loadStudio();
    } catch (error) { setMessage(errorText(error)); }
    finally { setBusy(false); }
  }

  async function submitWork(event: React.FormEvent) {
    event.preventDefault(); setBusy(true);
    try {
      await saveWork({ ...draft, sortOrder: editingId ? draft.sortOrder : works.length }, editingId ?? undefined);
      setDraft(emptyWork); setEditingId(null); await loadStudio(); setMessage('Work saved to Firestore.');
    } catch (error) { setMessage(errorText(error)); } finally { setBusy(false); }
  }

  async function saveProfile() { setBusy(true); try { await saveArtistProfile(artist); setMessage('Artist profile saved.'); } catch (error) { setMessage(errorText(error)); } finally { setBusy(false); } }
  async function saveHomepage() { setBusy(true); try { await saveHomepageContent(homepage); setMessage('Homepage content saved.'); } catch (error) { setMessage(errorText(error)); } finally { setBusy(false); } }
  async function moveWork(index: number, direction: -1 | 1) { const destination = index + direction; if (destination < 0 || destination >= works.length) return; const next = [...works]; [next[index], next[destination]] = [next[destination], next[index]]; setWorks(next); setBusy(true); try { await reorderWorks(next); setMessage('Artwork order saved.'); } catch (error) { setMessage(errorText(error)); } finally { setBusy(false); } }
  async function deleteWork(id: string) { if (!window.confirm('Delete this work from Firestore?')) return; setBusy(true); try { await removeWork(id); await loadStudio(); setMessage('Work deleted.'); } catch (error) { setMessage(errorText(error)); } finally { setBusy(false); } }

  if (!user) return <section className="admin-panel"><p className="eyebrow">CONTENT SYSTEM / FIREBASE</p><h1>Archive control.</h1><p>Google sign-in is required. Uploads are intentionally unavailable while Firebase Storage remains disabled; use a public image or video URL in the media field.</p><button className="admin-button" onClick={signIn} disabled={busy}>{busy ? 'CONNECTING…' : 'SIGN IN WITH GOOGLE'}</button><p className="admin-status" role="status">{message}</p></section>;

  return <section className="admin-panel admin-studio"><div className="admin-topline"><div><p className="eyebrow">CONTENT SYSTEM / AUTHENTICATED</p><h1>Archive control.</h1></div><button className="admin-button admin-button--quiet" onClick={() => signOut(firebaseAuth)}>SIGN OUT</button></div><p className="admin-status" role="status">{user.email} — {message}</p><div className="admin-grid">
    <section className="admin-section"><div className="admin-section-head"><p className="eyebrow">WORKS / {works.length}</p><button className="text-button" onClick={loadStudio} disabled={busy}>REFRESH</button></div><form onSubmit={submitWork} className="admin-form"><input required placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}/><input required placeholder="Slug (e.g. after-the-rain)" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })}/><div className="admin-form-row"><input required placeholder="Year" value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })}/><input required placeholder="Medium" value={draft.medium} onChange={(e) => setDraft({ ...draft, medium: e.target.value })}/></div><input required type="url" placeholder="Public image/video URL" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })}/><input required placeholder="Accessible image description" value={draft.imageAlt} onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })}/><textarea placeholder="Work description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })}/><label className="admin-check"><input type="checkbox" checked={draft.status === 'published'} onChange={(e) => setDraft({ ...draft, status: e.target.checked ? 'published' : 'draft' })}/> Published</label><button className="admin-button" disabled={busy}>{editingId ? 'SAVE WORK' : 'ADD WORK'}</button>{editingId && <button type="button" className="text-button" onClick={() => { setEditingId(null); setDraft(emptyWork); }}>CANCEL EDIT</button>}</form><div className="admin-records">{works.map((work, index) => <article key={work.id} className="admin-record"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{work.title}</strong><small>{work.status} / {work.year}</small></div><div className="admin-record-actions"><button onClick={() => moveWork(index, -1)} disabled={busy || index === 0} aria-label={`Move ${work.title} up`}>↑</button><button onClick={() => moveWork(index, 1)} disabled={busy || index === works.length - 1} aria-label={`Move ${work.title} down`}>↓</button><button onClick={() => { const { id: _id, ...fields } = work; setEditingId(work.id); setDraft(fields); }} aria-label={`Edit ${work.title}`}>EDIT</button><button onClick={() => deleteWork(work.id)} aria-label={`Delete ${work.title}`}>×</button></div></article>)}</div></section>
    <section className="admin-section"><p className="eyebrow">ARTIST / KR + EN</p><div className="admin-form"><input placeholder="Artist name" value={artist.name} onChange={(e) => setArtist({ ...artist, name: e.target.value })}/><textarea placeholder="Korean statement" value={artist.statement.ko} onChange={(e) => setArtist({ ...artist, statement: { ...artist.statement, ko: e.target.value } })}/><textarea placeholder="English statement" value={artist.statement.en} onChange={(e) => setArtist({ ...artist, statement: { ...artist.statement, en: e.target.value } })}/><textarea placeholder="Korean biography" value={artist.biography.ko} onChange={(e) => setArtist({ ...artist, biography: { ...artist.biography, ko: e.target.value } })}/><textarea placeholder="English biography" value={artist.biography.en} onChange={(e) => setArtist({ ...artist, biography: { ...artist.biography, en: e.target.value } })}/><button className="admin-button" onClick={saveProfile} disabled={busy}>SAVE PROFILE</button></div><p className="eyebrow admin-subhead">HOMEPAGE / KR + EN</p><div className="admin-form"><input placeholder="Hero kicker (EN)" value={homepage.heroKicker.en} onChange={(e) => setHomepage({ ...homepage, heroKicker: { ...homepage.heroKicker, en: e.target.value } })}/><input placeholder="Hero title (EN)" value={homepage.heroTitle.en} onChange={(e) => setHomepage({ ...homepage, heroTitle: { ...homepage.heroTitle, en: e.target.value } })}/><textarea placeholder="Hero body (EN)" value={homepage.heroBody.en} onChange={(e) => setHomepage({ ...homepage, heroBody: { ...homepage.heroBody, en: e.target.value } })}/><label className="admin-check"><input type="checkbox" checked={homepage.published} onChange={(e) => setHomepage({ ...homepage, published: e.target.checked })}/> Published</label><button className="admin-button" onClick={saveHomepage} disabled={busy}>SAVE HOMEPAGE</button></div></section>
  </div></section>;
}
