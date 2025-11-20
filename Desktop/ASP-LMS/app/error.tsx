'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">{t('errors.error')}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t('errors.somethingWentWrong')}
        </h2>
        <p className="text-gray-600 mb-8">
          {error.message || t('errors.error')}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {t('errors.tryAgain')}
          </button>
          <Link
            href="/login"
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            {t('errors.toHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
