import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPosts } from '@/lib/post/queries';

export async function PostList() {
  const post = await findAllPublicPosts();

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      {post
        .slice(1)
        .map(({ id, coverImageUrl, title, createdAt, excerpt, slug }) => {
          const postLink = `/post/${slug}`;

          return (
            <div className='grid grid-rows-subgrid gap-3 group' key={id}>
              <PostCoverImage
                imageProps={{
                  src: coverImageUrl,
                  alt: title,
                  width: 1200,
                  height: 720,
                }}
                linkProps={{
                  href: postLink,
                }}
              />

              <PostSummary
                createdAt={createdAt}
                excerpt={excerpt}
                title={title}
                postHeading='h2'
                postLink={postLink}
              />
            </div>
          );
        })}
    </div>
  );
}
