'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { PageFormValues } from '../lib/types';
import { RichTextEditor } from './RichTextEditor';

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  status: z.enum(['draft', 'published']),
  seoTitle: z.string().default(''),
  seoDescription: z.string().default(''),
  seoKeywords: z.string().default(''),
  blocks: z.array(z.object({ type: z.string(), content: z.record(z.unknown()), order: z.number().optional() })).default([])
});

export function PageComposer() {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PageFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      status: 'draft',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      blocks: []
    }
  });

  const blocks = watch('blocks') || [];

  const addBlock = (type: string) => {
    const newBlock = { type, content: {}, order: blocks.length };
    setValue('blocks', [...blocks, newBlock]);
  };

  const updateBlockContent = (index: number, content: Record<string, unknown>) => {
    const next = [...blocks];
    next[index] = { ...next[index], content };
    setValue('blocks', next);
  };

  const handleCreate = async (values: PageFormValues) => {
    try {
      const payload = {
        ...values,
        seoKeywords: values.seoKeywords.split(',').map((item) => item.trim()).filter(Boolean),
        blocks: values.blocks.map((block, index) => ({ ...block, order: index }))
      };
      const response = await api.post('/pages', payload);
      setMessage(`Page created: ${response.data?.data?.title || values.title}`);
    } catch (error) {
      setMessage('Failed to create page');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    setUploading(true);
    try {
      await api.post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage('Media uploaded');
    } catch (error) {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Title</label>
          <input {...register('title')} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
          {errors.title && <p className="mt-1 text-sm text-red-400">Title is required</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-400">Slug</label>
          <input {...register('slug')} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
          {errors.slug && <p className="mt-1 text-sm text-red-400">Slug is required</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-400">Excerpt</label>
        <textarea {...register('excerpt')} className="min-h-[100px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Status</label>
          <select {...register('status')} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-400">SEO Title</label>
          <input {...register('seoTitle')} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-400">SEO Description</label>
        <textarea {...register('seoDescription')} className="min-h-[100px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-400">SEO Keywords</label>
        <input {...register('seoKeywords')} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded-full border border-slate-700 px-4 py-2" onClick={() => addBlock('hero')}>
          Add Hero
        </button>
        <button type="button" className="rounded-full border border-slate-700 px-4 py-2" onClick={() => addBlock('paragraph')}>
          Add Paragraph
        </button>
        <button type="button" className="rounded-full border border-slate-700 px-4 py-2" onClick={() => addBlock('quote')}>
          Add Quote
        </button>
        <button type="button" className="rounded-full border border-slate-700 px-4 py-2" onClick={() => addBlock('math')}>
          Add Math
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={`${block.type}-${index}`} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-500">{block.type}</div>
            {block.type === 'paragraph' ? (
              <RichTextEditor value={String(block.content.text || '')} onChange={(text) => updateBlockContent(index, { text })} />
            ) : block.type === 'math' ? (
              <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Enter KaTeX equation" onChange={(event) => updateBlockContent(index, { equation: event.target.value })} />
            ) : (
              <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Block content" onChange={(event) => updateBlockContent(index, { text: event.target.value })} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <label className="mb-2 block text-sm text-slate-400">Upload media</label>
        <input type="file" onChange={(event) => setSelectedFile(event.target.files?.[0] || null)} className="w-full" />
        <button type="button" onClick={handleUpload} className="mt-3 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 font-medium text-slate-950">
        Create page
      </button>
      {message ? <p className="text-sm text-slate-400">{message}</p> : null}
    </form>
  );
}
