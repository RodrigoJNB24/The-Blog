import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';
import { PostFeatures } from '../PostFeatures';

export async function PostList() {
  const post = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      {post.map(post => {
        return (
          <div className='flex flex-col gap-3 group' key={post.id}>

            <PostCoverImage
              imageProps={{ 
                src: post.coverImageUrl,
                alt: post.title,
                width: 1200,
                height: 720,
              }}
              linkProps={{
                href: `/post/${post.slug}`,
              }}
            />

            <PostFeatures time={post.createdAt}>
              <PostHeading url={`/${post.slug}`} as='h2'>
                {post.title}
              </PostHeading>

              <p>
                {post.excerpt}
              </p>
            </PostFeatures>

          </div>
        );
      })}
    </div>
  );
}
