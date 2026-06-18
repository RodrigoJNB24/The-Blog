import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostFeatured } from '@/components/PostFeatured';
import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import { Suspense } from 'react';
import clsx from 'clsx';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>
    </>


      

  );
}
