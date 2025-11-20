'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';
import { AcceptOfferButton, DeclineOfferButton } from '@/components/OfferButtons';

interface ResultPageContentProps {
  studentData: any;
  latestAttempt: any;
}

export default function ResultPageContent({ studentData, latestAttempt }: ResultPageContentProps) {
  const { t } = useLocale();

  const getStatusText = (status: string) => t(`student.status.${status}`);
  const getStatusDescription = (status: string) => t(`student.statusDescription.${status}`);
  const getOfferText = (status: string) => {
    if (status === 'OFFER_TRAINEE' || status === 'HIRED_TRAINEE') {
      return t('student.offerText.trainee');
    }
    if (status === 'OFFER_REALTOR' || status === 'HIRED_REALTOR') {
      return t('student.offerText.realtor');
    }
    return '';
  };

  const showOffer = ['OFFER_TRAINEE', 'OFFER_REALTOR'].includes(studentData.status);
  const isHired = ['HIRED_TRAINEE', 'HIRED_REALTOR'].includes(studentData.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('student.result.title')}</h1>
      </div>

      {latestAttempt && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('student.result.yourResult')}</h2>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-indigo-600">
              {latestAttempt.score} {t('student.result.points')}
            </p>
            <p>
              <span className="font-medium">{t('student.result.status')}:</span>{' '}
              {getStatusText(studentData.status)}
            </p>
          </div>
        </div>
      )}

      {getStatusDescription(studentData.status) && (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-700 leading-relaxed">
            {getStatusDescription(studentData.status)}
          </p>
        </div>
      )}

      {showOffer && getOfferText(studentData.status) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('student.result.offer')}</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {getOfferText(studentData.status)}
            </pre>
          </div>
          <div className="flex space-x-4">
            <AcceptOfferButton />
            <DeclineOfferButton />
          </div>
        </div>
      )}

      {isHired && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-green-800 font-semibold mb-2">
            {t('student.result.congratulations')}
          </p>
          <p className="text-green-700">
            {t('student.result.hrContact')}
          </p>
        </div>
      )}

      <div>
        <Link
          href="/student"
          className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {t('student.result.backToDashboard')}
        </Link>
      </div>
    </div>
  );
}

