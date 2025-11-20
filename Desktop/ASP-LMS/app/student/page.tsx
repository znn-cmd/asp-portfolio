import StudentLayout from '@/components/StudentLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import StudentDashboardContent from '@/components/StudentDashboardContent';

async function getStudentData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      activeCourse: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
          quiz: {
            include: {
              questions: true,
            },
          },
        },
      },
      attempts: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  const courses = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      lessons: true,
      quiz: true,
    },
  });

  return { user, courses };
}


export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  const { user: studentData, courses } = await getStudentData(user.id);

  if (!studentData) {
    redirect('/login');
  }

  return (
    <StudentLayout>
      <StudentDashboardContent studentData={studentData} courses={courses} />
    </StudentLayout>
  );
}

