import { findAllPostsAdmin } from '@/lib/post/queries/admins';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  'use cache';
  const posts = await findAllPostsAdmin();

  return (
    <div className='py-16 text-6xl'>
      {posts.map(({ id, title }) => {
        return <p key={id}>{title}</p>;
      })}
    </div>
  );
}
