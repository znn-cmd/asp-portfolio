'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface LessonPageContentProps {
  lesson: any;
  prevLesson: any;
  nextLesson: any;
}

export default function LessonPageContent({ lesson, prevLesson, nextLesson }: LessonPageContentProps) {
  const { t } = useLocale();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link
          href="/student/course"
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          ← {t('student.lesson.backToLessons')}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('student.course.lessonPreview', { order: lesson.order, title: lesson.title })}
        </h1>
        <div className="prose max-w-none mt-6">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {lesson.content}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white rounded-lg shadow p-4">
        {prevLesson ? (
          <Link
            href={`/student/course/lesson/${prevLesson.id}`}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            ← {t('student.lesson.previousLesson')}
          </Link>
        ) : (
          <div></div>
        )}
        {nextLesson ? (
          <Link
            href={`/student/course/lesson/${nextLesson.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {t('student.lesson.nextLesson')} →
          </Link>
        ) : (
          <Link
            href="/student/course"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {t('student.lesson.backToCourse')}
          </Link>
        )}
      </div>
    </div>
  );
}

