'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { PageComposer } from '../../components/PageComposer';
import { RootState } from '../../store/store';
import { clearAuth, setAuth } from '../../store/slices/authSlice';
import { setPages } from '../../store/slices/pagesSlice';
import { setSiteName } from '../../store/slices/settingsSlice';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, admin } = useSelector((state: RootState) => state.auth);
  const pages = useSelector((state: RootState) => state.pages.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cms-access-token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadData = async () => {
      try {
        const meResponse = await api.get('/auth/me');
        dispatch(setAuth({ admin: meResponse.data?.data?.admin, token }));
        const pagesResponse = await api.get('/pages?limit=10');
        dispatch(setPages(pagesResponse.data?.data?.pages || []));
        const settingsResponse = await api.get('/settings');
        dispatch(setSiteName(settingsResponse.data?.data?.siteName || 'RenewCred CMS'));
      } catch (error) {
        dispatch(clearAuth());
        localStorage.removeItem('cms-access-token');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, router]);

  const stats = useMemo(() => {
    const published = pages.filter((page) => page.status === 'published').length;
    const drafts = pages.filter((page) => page.status === 'draft').length;
    return [
      { label: 'Total pages', value: pages.length },
      { label: 'Published', value: published },
      { label: 'Drafts', value: drafts }
    ];
  }, [pages]);

  const handleLogout = () => {
    localStorage.removeItem('cms-access-token');
    dispatch(clearAuth());
    router.push('/login');
  };

  if (loading) {
    return <div className="p-10 text-slate-300">Loading dashboard…</div>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Admin Dashboard</p>
            <h1 className="text-3xl font-semibold">Welcome back, {String(admin?.name || 'Administrator')}</h1>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-slate-700 px-4 py-2 text-sm">Logout</button>
        </header>

        <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li className="rounded-xl bg-slate-800 px-3 py-2">Dashboard</li>
              <li className="rounded-xl px-3 py-2">Content</li>
              <li className="rounded-xl px-3 py-2">Media</li>
              <li className="rounded-xl px-3 py-2">Settings</li>
            </ul>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Pages</h2>
                  <span className="text-sm text-slate-400">{pages.length} items</span>
                </div>
                <div className="mt-4 space-y-3">
                  {pages.map((page) => (
                    <div key={page._id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{page.title}</h3>
                        <span className="text-xs uppercase tracking-[0.3em] text-emerald-400">{page.status}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">{page.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-semibold">Activity</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">Page drafted and autosaved.</li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">SEO fields updated for the home page.</li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">Media uploaded through the CMS interface.</li>
                </ul>
              </div>
            </div>

            <PageComposer />
          </section>
        </div>
      </div>
    </main>
  );
}
