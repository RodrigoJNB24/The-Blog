import clsx from 'clsx';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPosts } from '@/lib/post/queries';

export async function PostFeatured() {
  const posts = await findAllPublicPosts();
  const { title, slug, coverImageUrl, excerpt, createdAt } = posts[0];

  const postLink = `/posts/${slug}`;

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
