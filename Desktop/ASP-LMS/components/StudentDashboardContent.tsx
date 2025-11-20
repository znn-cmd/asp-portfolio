'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface StudentDashboardContentProps {
  studentData: any;
  courses: any[];
}

export default function StudentDashboardContent({ studentData, courses }: StudentDashboardContentProps) {
  const { t } = useLocale();

  const getStatusText = (status: string) => t(`student.status.${status}`);
  const getOfferStatusText = (status: string) => t(`student.offerStatus.${status}`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('student.dashboard.title', { name: studentData.fullName })}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{t('student.dashboard.status')}</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">{t('student.dashboard.status')}:</span>{' '}
            {getStatusText(studentData.status)}
          </p>
          {studentData.score !== null && (
            <p>
              <span className="font-medium">{t('student.dashboard.score')}:</span> {studentData.score} {t('student.result.points')}
            </p>
          )}
          {studentData.offerStatus !== 'NONE' && (
            <p>
              <span className="font-medium">{t('student.dashboard.offerStatus')}:</span>{' '}
              {getOfferStatusText(studentData.offerStatus)}
            </p>
          )}
        </div>
      </div>

      {!studentData.activeCourseId ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('student.dashboard.selectCourse')}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {t('student.dashboard.lessonsCount')}: {course.lessons.length} | {t('student.dashboard.quizAvailable')}: {course.quiz ? t('common.yes') : t('common.no')}
                </p>
                <form action="/api/student/select-course" method="POST">
                  <input type="hidden" name="courseId" value={course.id} />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {t('student.dashboard.startCourse')}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t('student.dashboard.activeCourse')}: {studentData.activeCourse?.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {studentData.activeCourse?.description}
          </p>
          <div className="space-y-2 mb-4">
            <p>
              <span className="font-medium">{t('student.dashboard.lessonsCount')}:</span>{' '}
              {studentData.activeCourse?.lessons.length || 0}
            </p>
            {studentData.activeCourse?.quiz && (
              <p>
                <span className="font-medium">{t('student.dashboard.quizAvailable')}:</span> {t('common.available')}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <Link
              href="/student/course"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('student.dashboard.goToLessons')}
            </Link>
            {studentData.attempts.length > 0 && (
              <Link
                href="/student/result"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                {t('student.dashboard.viewResults')}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

