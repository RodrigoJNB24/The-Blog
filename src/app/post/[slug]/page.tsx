import { findBySlugPostsCached } from '@/lib/post/queries';
import { notFound } from 'next/navigation';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  let post;

  try {
    post = await findBySlugPostsCached(slug);
  } catch {
    post = null;
  }

  if (!post) notFound();

  return <h1 className='text-7xl font-extrabold py-16'>{post.author}</h1>;
}
