'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface CoursePageContentProps {
  course: any;
  canTakeQuiz: boolean;
}

export default function CoursePageContent({ course, canTakeQuiz }: CoursePageContentProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/student"
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          ← {t('student.course.backToDashboard')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{t('student.course.lessons')}</h2>
        <div className="space-y-3">
          {course.lessons.map((lesson: any) => (
            <div
              key={lesson.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {t('student.course.lessonPreview', { order: lesson.order, title: lesson.title })}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.content.substring(0, 150)}...
                  </p>
                </div>
                <Link
                  href={`/student/course/lesson/${lesson.id}`}
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 whitespace-nowrap"
                >
                  {t('student.course.open')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canTakeQuiz && course.quiz && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('student.course.quiz')}</h2>
          <p className="text-gray-600 mb-4">
            {t('student.course.quizDescription')}
          </p>
          <Link
            href="/student/quiz"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
          >
            {t('student.course.goToQuiz')}
          </Link>
        </div>
      )}
    </div>
  );
}

