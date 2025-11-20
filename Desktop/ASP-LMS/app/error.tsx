'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Ошибка</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Что-то пошло не так
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || 'Произошла непредвиденная ошибка'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Попробовать снова
          </button>
          <Link
            href="/login"
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

