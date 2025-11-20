'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface HrDashboardContentProps {
  users: any[];
  funnel: any;
}

export default function HrDashboardContent({ users, funnel }: HrDashboardContentProps) {
  const { t } = useLocale();

  const getStatusText = (status: string) => t(`student.status.${status}`);
  const getOfferStatusText = (status: string) => {
    if (status === 'NONE') return t('student.offerStatus.NONE');
    return t(`student.offerStatus.${status}`);
  };

  const funnelCards = [
    { label: t('hr.funnel.total'), value: funnel.total, color: 'bg-blue-500', key: 'total' },
    { label: t('hr.funnel.NEW'), value: funnel.NEW, color: 'bg-gray-500', key: 'NEW' },
    { label: t('hr.funnel.COURSE_IN_PROGRESS'), value: funnel.COURSE_IN_PROGRESS, color: 'bg-yellow-500', key: 'COURSE_IN_PROGRESS' },
    { label: t('hr.funnel.QUIZ_PENDING'), value: funnel.QUIZ_PENDING, color: 'bg-orange-500', key: 'QUIZ_PENDING' },
    { label: t('hr.funnel.QUIZ_COMPLETED'), value: funnel.QUIZ_COMPLETED, color: 'bg-purple-500', key: 'QUIZ_COMPLETED' },
    { label: t('hr.funnel.REJECTED'), value: funnel.REJECTED, color: 'bg-red-500', key: 'REJECTED' },
    { label: t('hr.funnel.OFFER_TRAINEE'), value: funnel.OFFER_TRAINEE, color: 'bg-green-500', key: 'OFFER_TRAINEE' },
    { label: t('hr.funnel.OFFER_REALTOR'), value: funnel.OFFER_REALTOR, color: 'bg-teal-500', key: 'OFFER_REALTOR' },
    { label: t('hr.funnel.OFFER_DECLINED'), value: funnel.OFFER_DECLINED, color: 'bg-pink-500', key: 'OFFER_DECLINED' },
    { label: t('hr.funnel.HIRED_TRAINEE'), value: funnel.HIRED_TRAINEE, color: 'bg-emerald-500', key: 'HIRED_TRAINEE' },
    { label: t('hr.funnel.HIRED_REALTOR'), value: funnel.HIRED_REALTOR, color: 'bg-cyan-500', key: 'HIRED_REALTOR' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('hr.dashboard.title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('hr.dashboard.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {funnelCards.map((card) => (
          <div
            key={card.key}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className={`${card.color} w-12 h-12 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-xl`}>
              {card.value}
            </div>
            <h3 className="text-sm font-medium text-gray-700">{card.label}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{t('hr.dashboard.candidates')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.username')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.course')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.score')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.offer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('hr.dashboard.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.activeCourse?.title || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusText(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.score !== null ? `${student.score}/100` : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getOfferStatusText(student.offerStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/hr/users/${student.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {t('hr.dashboard.details')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

