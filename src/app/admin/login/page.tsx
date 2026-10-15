// export const dynamic = 'force-dynamic';
import { LoginForm } from '@/components/Admin/LoginForm';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import { Suspense } from 'react';

export default async function AdminLoginPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <LoginForm />
    </Suspense>
  );
}
