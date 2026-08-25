import { PostListAdmin } from '@/components/Admin/PostListAdmin';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostListAdmin />
    </Suspense>
  );
}
