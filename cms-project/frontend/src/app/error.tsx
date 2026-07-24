'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="p-8 text-red-400">
      <p>Something went wrong while loading the site.</p>
      <button onClick={() => reset()} className="mt-4 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white">
        Try again
      </button>
    </div>
  );
}
