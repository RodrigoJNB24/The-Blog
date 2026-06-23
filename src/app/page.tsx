import { PostFeatured } from '@/components/PostFeatured';
import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      
        <PostList />
      </Suspense>
    </>
  );
}
