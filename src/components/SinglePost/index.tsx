import { findBySlugPostsCached } from '@/lib/post/queries';
import Image from 'next/image';
import PostHeading from '../PostHeading';
import PostDate from '../PostDate';
import SafeMarkDown from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findBySlugPostsCached(slug);

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-8'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={7200}
          alt={post.title}
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author} | {<PostDate dateTime={post.createdAt} />}
        </p>
      </header>

      <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>

      <SafeMarkDown markdown={post.content}/>
    </article>
  );
}
