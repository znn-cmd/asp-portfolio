'use client';

import { useLocale } from '@/contexts/LocaleContext';
import Link from 'next/link';

interface HrCourseDetailContentProps {
  course: any;
}

export default function HrCourseDetailContent({ course }: HrCourseDetailContentProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/hr/courses"
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          ← {t('hr.courses.backToList')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{t('hr.courses.courseInfo')}</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">{t('hr.courses.status')}:</span>{' '}
            {course.isActive ? (
              <span className="text-green-600">{t('hr.courses.active')}</span>
            ) : (
              <span className="text-gray-600">{t('hr.courses.inactive')}</span>
            )}
          </p>
          <p>
            <span className="font-medium">{t('hr.courses.created')}:</span>{' '}
            {new Date(course.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">{t('hr.courses.createdBy')}:</span> {course.createdBy.fullName}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t('hr.courses.lessonsList', { count: course.lessons.length })}
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson: any) => (
            <div
              key={lesson.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="font-semibold text-lg mb-2">
                {t('student.course.lessonPreview', { order: lesson.order, title: lesson.title })}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {lesson.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {course.quiz && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t('hr.courses.quizTitle', { title: course.quiz.title, count: course.quiz.questions.length })}
          </h2>
          <p className="text-gray-600 mb-4">{course.quiz.description}</p>
          <div className="space-y-4">
            {course.quiz.questions.map((question: any, index: number) => {
              const options = JSON.parse(question.options);
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    {t('student.quiz.question', { number: index + 1 })}: {question.text}
                  </h3>
                  <div className="space-y-1">
                    {options.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          optIndex === question.correctOptionIndex
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        {optIndex === question.correctOptionIndex && (
                          <span className="text-green-600 font-semibold mr-2">
                            {t('hr.courses.correctAnswer')}
                          </span>
                        )}
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {t('hr.courses.questionWeight', { weight: question.weight })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

