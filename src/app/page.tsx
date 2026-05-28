import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import clsx from 'clsx';
import { Suspense } from 'react';

export default async function HomePage() {

  return (
    <div className='text-slate-900 bg-slate-300 min-h-screen'>
      <header>
        <h1
          className={clsx(
            'text-6xl',
            'font-bold',
            'text-center',
            'py-8',
            'text-stone-500',
          )}
        >
          Aqui é a HEADER
        </h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>

      <footer>
        <p className={clsx('text-6xl', 'font-bold', 'text-center', 'py-8')}>
          FOOTER
        </p>
      </footer>
    </div>
  );
}
