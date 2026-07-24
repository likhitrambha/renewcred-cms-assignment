'use client';

import React, { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import api from '../../lib/api';
import { setAuth } from '../../store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('admin@cms.com');
  const [password, setPassword] = useState('Password123@');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email: email.trim(), password });
      const token = response.data?.data?.accessToken;
      const admin = response.data?.data?.admin;
      localStorage.setItem('cms-access-token', token);
      dispatch(setAuth({ admin, token }));
      router.push('/dashboard');
    } catch (err) {
      setError('Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to manage pages, media, and settings.</p>
        <div className="mt-6 space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Email" autoComplete="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Password" autoComplete="current-password" />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-emerald-500 px-4 py-2 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </main>
  );
}
