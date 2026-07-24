export type Block = {
  type: string;
  content: Record<string, unknown>;
  order?: number;
};

export type PageRecord = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  status: 'draft' | 'published';
  blocks: Block[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type SettingRecord = {
  siteName?: string;
  siteDescription?: string;
  contactEmail?: string;
  footerText?: string;
  theme?: string;
};
