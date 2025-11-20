import StudentLayout from '@/components/StudentLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CoursePageContent from '@/components/CoursePageContent';

async function getCourseData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      activeCourse: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
          quiz: true,
        },
      },
    },
  });

  return user;
}

export default async function CoursePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  const studentData = await getCourseData(user.id);

  if (!studentData || !studentData.activeCourseId || !studentData.activeCourse) {
    redirect('/student');
  }

  const course = studentData.activeCourse;
  const totalLessons = course.lessons.length;
  const canTakeQuiz = totalLessons > 0; // В демо можно сразу перейти к тесту

  return (
    <StudentLayout>
      <CoursePageContent course={course} canTakeQuiz={canTakeQuiz} />
    </StudentLayout>
  );
}

