'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface HrCoursesListContentProps {
  courses: any[];
}

export default function HrCoursesListContent({ courses }: HrCoursesListContentProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('hr.courses.title')}</h1>
          <p className="text-gray-600 mt-2">
            {t('hr.courses.subtitle')}
          </p>
        </div>
        <Link
          href="/hr/courses/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {t('hr.courses.createNew')}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 flex-1">
                {course.title}
              </h3>
              {course.isActive ? (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {t('hr.courses.active')}
                </span>
              ) : (
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {t('hr.courses.inactive')}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="space-y-1 mb-4 text-sm text-gray-500">
              <p>{t('hr.courses.lessons')}: {course.lessons.length}</p>
              <p>{t('hr.courses.quiz')}: {course.quiz ? `${t('common.yes')} (${course.quiz.questions.length} ${t('hr.courses.questions')})` : t('common.no')}</p>
              <p className="text-xs">
                {t('hr.courses.created')}: {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Link
              href={`/hr/courses/${course.id}`}
              className="inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t('hr.courses.details')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

