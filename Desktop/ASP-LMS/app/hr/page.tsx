import HrLayout from '@/components/HrLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HrDashboardContent from '@/components/HrDashboardContent';

async function getDashboardData() {
  const users = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      activeCourse: true,
      attempts: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  const courses = await prisma.course.findMany({
    where: { isActive: true },
  });

  // Подсчёт воронки
  const funnel = {
    total: users.length,
    NEW: users.filter((u) => u.status === 'NEW').length,
    COURSE_IN_PROGRESS: users.filter((u) => u.status === 'COURSE_IN_PROGRESS').length,
    QUIZ_PENDING: users.filter((u) => u.status === 'QUIZ_PENDING').length,
    QUIZ_COMPLETED: users.filter((u) => u.status === 'QUIZ_COMPLETED').length,
    REJECTED: users.filter((u) => u.status === 'REJECTED').length,
    OFFER_TRAINEE: users.filter((u) => u.status === 'OFFER_TRAINEE').length,
    OFFER_REALTOR: users.filter((u) => u.status === 'OFFER_REALTOR').length,
    OFFER_DECLINED: users.filter((u) => u.status === 'OFFER_DECLINED').length,
    HIRED_TRAINEE: users.filter((u) => u.status === 'HIRED_TRAINEE').length,
    HIRED_REALTOR: users.filter((u) => u.status === 'HIRED_REALTOR').length,
  };

  return { users, courses, funnel };
}


export default async function HrDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'HR') {
    redirect('/login');
  }

  const { users, courses, funnel } = await getDashboardData();

  return (
    <HrLayout>
      <HrDashboardContent users={users} funnel={funnel} />
    </HrLayout>
  );
}

