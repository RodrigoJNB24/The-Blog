import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';
import clsx from 'clsx';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();

  if(posts.length <= 0) return <ErrorMessage contentTitle='Ops! 🤭' content='Ainda não criamos nem um post.' />;

  const { title, slug, coverImageUrl, excerpt, createdAt } = posts[0];

  const postLink = `/post/${slug}`;

  return (
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
          src: coverImageUrl,
          alt: title,
          width: 1200,
          height: 720,
          priority: true,
        }}
        linkProps={{
          href: postLink,
        }}
      />
      <PostSummary
        postLink={postLink}
        postHeading='h1'
        createdAt={createdAt}
        excerpt={excerpt}
        title={title}
      />
    </section>
  );
}
