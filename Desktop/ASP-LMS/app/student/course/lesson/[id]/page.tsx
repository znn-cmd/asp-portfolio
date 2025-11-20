import StudentLayout from '@/components/StudentLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LessonPageContent from '@/components/LessonPageContent';

async function getLessonData(userId: string, lessonId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      activeCourse: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });

  if (!user?.activeCourse) {
    return null;
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson || lesson.courseId !== user.activeCourseId) {
    return null;
  }

  const currentIndex = user.activeCourse.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? user.activeCourse.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < user.activeCourse.lessons.length - 1
      ? user.activeCourse.lessons[currentIndex + 1]
      : null;

  return { lesson, prevLesson, nextLesson, course: user.activeCourse };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getLessonData(user.id, id);

  if (!data) {
    redirect('/student/course');
  }

  const { lesson, prevLesson, nextLesson, course } = data;

  return (
    <StudentLayout>
      <LessonPageContent lesson={lesson} prevLesson={prevLesson} nextLesson={nextLesson} />
    </StudentLayout>
  );
}

