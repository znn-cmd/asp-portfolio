import HrLayout from '@/components/HrLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HrUsersListContent from '@/components/HrUsersListContent';

async function getUsers() {
  return await prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      activeCourse: true,
      attempts: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}


export default async function UsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'HR') {
    redirect('/login');
  }

  const users = await getUsers();

  return (
    <HrLayout>
      <HrUsersListContent users={users} />
    </HrLayout>
  );
}

