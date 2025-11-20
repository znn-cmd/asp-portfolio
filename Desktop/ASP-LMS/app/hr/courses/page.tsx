import HrLayout from '@/components/HrLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HrCoursesListContent from '@/components/HrCoursesListContent';

async function getCourses() {
  return await prisma.course.findMany({
    include: {
      lessons: true,
      quiz: {
        include: {
          questions: true,
        },
      },
      createdBy: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function CoursesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'HR') {
    redirect('/login');
  }

  const courses = await getCourses();

  return (
    <HrLayout>
      <HrCoursesListContent courses={courses} />
    </HrLayout>
  );
}

