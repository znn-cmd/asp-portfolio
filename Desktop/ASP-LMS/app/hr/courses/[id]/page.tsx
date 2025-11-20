import HrLayout from '@/components/HrLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HrCourseDetailContent from '@/components/HrCourseDetailContent';

async function getCourseData(courseId: string) {
  return await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
      },
      quiz: {
        include: {
          questions: {
            orderBy: { createdAt: 'asc' },
          },
        },
      },
      createdBy: true,
    },
  });
}

export default async function CourseDetailPage({
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
  
  if (!user || user.role !== 'HR') {
    redirect('/login');
  }

  const course = await getCourseData(id);

  if (!course) {
    redirect('/hr/courses');
  }

  return (
    <HrLayout>
      <HrCourseDetailContent course={course} />
    </HrLayout>
  );
}

