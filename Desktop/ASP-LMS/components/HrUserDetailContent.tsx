'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface HrUserDetailContentProps {
  studentData: any;
}

export default function HrUserDetailContent({ studentData }: HrUserDetailContentProps) {
  const { t } = useLocale();

  const getStatusText = (status: string) => t(`student.status.${status}`);
  const getOfferStatusText = (status: string) => {
    if (status === 'NONE') return t('student.offerStatus.NONE');
    return t(`student.offerStatus.${status}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/hr/users"
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          ← {t('hr.users.backToList')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('hr.users.candidateDetails', { name: studentData.fullName })}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('hr.users.basicInfo')}</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">{t('hr.dashboard.name')}:</span> {studentData.fullName}
            </p>
            <p>
              <span className="font-medium">{t('hr.dashboard.username')}:</span> {studentData.username}
            </p>
            <p>
              <span className="font-medium">{t('hr.users.role')}:</span> {studentData.role}
            </p>
            <p>
              <span className="font-medium">{t('hr.dashboard.status')}:</span> {getStatusText(studentData.status)}
            </p>
            {studentData.score !== null && (
              <p>
                <span className="font-medium">{t('hr.dashboard.score')}:</span> {studentData.score}/100
              </p>
            )}
            {studentData.offerStatus !== 'NONE' && (
              <p>
                <span className="font-medium">{t('hr.dashboard.offer')}:</span> {getOfferStatusText(studentData.offerStatus)}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('hr.users.activeCourse')}</h2>
          {studentData.activeCourse ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t('hr.users.courseTitle')}:</span> {studentData.activeCourse.title}
              </p>
              <p>
                <span className="font-medium">{t('hr.users.lessonsCount')}:</span> {studentData.activeCourse.lessons.length}
              </p>
              {studentData.activeCourse.quiz && (
                <p>
                  <span className="font-medium">{t('hr.users.quizAvailable')}:</span> {t('common.yes')}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">{t('hr.users.noCourse')}</p>
          )}
        </div>
      </div>

      {studentData.attempts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('hr.users.attempts')}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('hr.users.courseName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('hr.users.date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('hr.users.score')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentData.attempts.map((attempt: any) => (
                  <tr key={attempt.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {attempt.quiz?.course?.title || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(attempt.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attempt.score}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

