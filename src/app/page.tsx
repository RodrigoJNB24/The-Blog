import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section
        className={clsx('grid', 'grid-cols-1', 'gap-8 mb-16', 'sm:grid-cols-2', 'group')}
      >
        <Link className='w-full h-full overflow-hidden rounded-xl' href='#'>
          <Image
            className='group-hover:scale-105 transition'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='titulo do link'
          />
        </Link>
        <div>
          <></>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nobis
          ad. Dolores fugiat dolorem at enim nisi, quo sapiente eos tempora,
          laboriosam rem explicabo, et molestiae quisquam maxime aperiam fugit!
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>

      <footer>
        <p className={clsx('text-6xl', 'font-bold', 'text-center', 'py-8')}>
          FOOTER
        </p>
      </footer>
    </Container>
  );
}
