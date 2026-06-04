import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostCoverImage } from '@/components/PostCoverImage';
import { PostHeading } from '@/components/PostHeading';
import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader.tsx';
import clsx from 'clsx';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section
        className={clsx(
          'grid',
          'grid-cols-1',
          'gap-8',
          'mb-16',
          'sm:grid-cols-2',
          'group',
        )}
      >
        <PostCoverImage
          imageProps={{
            src: '/images/bryen_5.png',
            alt: 'Titulo do post',
            width: 1200,
            height: 720,
            priority: true,
          }}
          linkProps={{
            href: '/post/5',
          }}
        />

        <div className='flex flex-col justify-center gap-4'>
          <time
            className='text-slate-600 text-sm/tight block'
            dateTime='2026-06-02'
          >
            2026/06/02 10:00
          </time>

          <PostHeading url='#' as='h1'>
            Lorem ipsum dolor sit amet.
          </PostHeading>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            nobis ad. Dolores fugiat dolorem at enim nisi, quo sapiente eos
            tempora, laboriosam rem explicabo, et molestiae quisquam maxime
            aperiam fugit!
          </p>
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
