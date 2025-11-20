'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

export function AcceptOfferButton({ status }: { status?: string }) {
  const router = useRouter();
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/student/offer/accept', {
        method: 'POST',
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error accepting offer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {loading ? t('student.result.accepting') : t('student.result.acceptOffer')}
    </button>
  );
}

export function DeclineOfferButton() {
  const router = useRouter();
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);

  const handleDecline = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/student/offer/decline', {
        method: 'POST',
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error declining offer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDecline}
      disabled={loading}
      className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {loading ? t('student.result.declining') : t('student.result.declineOffer')}
    </button>
  );
}
