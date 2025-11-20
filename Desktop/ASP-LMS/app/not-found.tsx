'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{t('errors.notFound')}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t('errors.pageNotFound')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('errors.pageNotFoundDescription')}
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {t('errors.backToHome')}
        </Link>
      </div>
    </div>
    );
}
