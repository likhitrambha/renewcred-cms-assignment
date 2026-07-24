'use client';

import { useGetSettingsQuery } from '../store/api';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { data } = useGetSettingsQuery(undefined);
  const settings = data?.data || {};

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 lg:px-8">
      <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold">{settings.siteName || 'RenewCred CMS'}</h1>
          <p className="text-sm text-slate-400">{settings.siteDescription || 'A production-ready CMS'}</p>
        </div>
        <a href="/" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950">Visit Home</a>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-400">
        {settings.footerText || settings.contactEmail || 'Powered by RenewCred CMS'}
      </footer>
    </div>
  );
}
