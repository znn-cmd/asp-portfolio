import StudentLayout from '@/components/StudentLayout';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ResultPageContent from '@/components/ResultPageContent';

async function getStudentResult(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      attempts: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: {
          quiz: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  return user;
}


export default async function ResultPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  const studentData = await getStudentResult(user.id);

  if (!studentData) {
    redirect('/student');
  }

  const lastAttempt = studentData.attempts[0];

  return (
    <StudentLayout>
      <ResultPageContent studentData={studentData} latestAttempt={lastAttempt} />
    </StudentLayout>
  );
}

