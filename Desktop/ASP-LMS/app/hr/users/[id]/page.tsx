import HrLayout from '@/components/HrLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HrUserDetailContent from '@/components/HrUserDetailContent';

async function getUserData(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      activeCourse: {
        include: {
          lessons: true,
          quiz: {
            include: {
              questions: true,
            },
          },
        },
      },
      attempts: {
        include: {
          quiz: {
            include: {
              course: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}


export default async function UserDetailPage({
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

  const studentData = await getUserData(id);

  if (!studentData || studentData.role !== 'STUDENT') {
    redirect('/hr/users');
  }

  return (
    <HrLayout>
      <HrUserDetailContent studentData={studentData} />
    </HrLayout>
  );
}

