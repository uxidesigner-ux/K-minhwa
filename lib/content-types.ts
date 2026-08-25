export type LocalizedText = {
  ko: string;
  en: string;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  image: string;
  imageAlt: string;
  status: 'draft' | 'published';
  sortOrder: number;
};

export type ArtistProfile = {
  name: string;
  statement: LocalizedText;
  biography: LocalizedText;
};

export type HomepageContent = {
  heroKicker: LocalizedText;
  heroTitle: LocalizedText;
  heroBody: LocalizedText;
  published: boolean;
};
