'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlockRenderer } from '../../components/BlockRenderer';
import { SiteLayout } from '../../components/SiteLayout';
import type { PageRecord } from '../../lib/types';
import api from '../../lib/api';

export default function PageRoute() {
  const params = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!params.slug) return;
      try {
        const response = await api.get(`/pages/${params.slug}`);
        setPage(response.data?.data || null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.slug]);

  if (loading) return <div className="p-8 text-slate-300">Loading page…</div>;
  if (!page) return <div className="p-8 text-red-400">Page could not be found.</div>;

  return (
    <SiteLayout>
      <article className="space-y-8">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Published page</p>
          <h1 className="text-4xl font-semibold">{page.title}</h1>
          <p className="max-w-3xl text-lg text-slate-400">{page.excerpt}</p>
        </header>
        <div className="space-y-4">
          {page.blocks?.map((block, index) => (
            <BlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
