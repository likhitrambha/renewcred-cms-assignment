'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteLayout } from '../components/SiteLayout';
import type { PageRecord } from '../lib/types';
import api from '../lib/api';

export default function HomePage() {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/pages?status=published&limit=20');
        setPages(response.data?.data?.pages || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <SiteLayout>
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">RenewCred CMS</p>
          <h2 className="mt-4 text-4xl font-semibold">Publish modern content with a responsive public website and a powerful admin console.</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">The site consumes backend APIs only and dynamically renders editor-defined blocks for pages, posts, and landing experiences.</p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-slate-300">Loading pages…</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {pages.map((page) => (
              <Link key={page._id} href={`/${page.slug}`} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-400">
                <h3 className="text-xl font-semibold">{page.title}</h3>
                <p className="mt-3 text-slate-400">{page.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
