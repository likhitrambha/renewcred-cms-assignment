'use client';

import React from 'react';
import type { Block } from '../lib/types';

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero':
      return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-4xl font-semibold">{String((block.content as Record<string, unknown>).title || 'Hero')}</h2>
          <p className="mt-4 text-slate-300">{String((block.content as Record<string, unknown>).subtitle || '')}</p>
        </section>
      );
    case 'paragraph':
      return <p className="text-lg leading-8 text-slate-300">{String((block.content as Record<string, unknown>).text || '')}</p>;
    case 'quote':
      return <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-slate-300">{String((block.content as Record<string, unknown>).text || '')}</blockquote>;
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-6 text-slate-300">
          {Array.isArray((block.content as Record<string, unknown>).items) ? ((block.content as Record<string, unknown>).items as string[]).map((item, index) => <li key={`${item}-${index}`}>{item}</li>) : null}
        </ul>
      );
    case 'image':
      return <img src={String((block.content as Record<string, unknown>).src || '/')} alt={String((block.content as Record<string, unknown>).alt || 'Image')} className="rounded-2xl" />;
    case 'faq':
      return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="font-semibold">{String((block.content as Record<string, unknown>).title || 'FAQ')}</h3>
          <p className="mt-2 text-slate-300">{String((block.content as Record<string, unknown>).answer || '')}</p>
        </div>
      );
    default:
      return <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-slate-400">{block.type}</div>;
  }
}
