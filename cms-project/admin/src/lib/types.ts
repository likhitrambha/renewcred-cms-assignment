export type PageRecord = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  blocks?: Array<{ type: string; content: Record<string, unknown>; order?: number }>;
  createdAt?: string;
  updatedAt?: string;
};

export type PageFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  blocks: Array<{ type: string; content: Record<string, unknown>; order?: number }>;
};
