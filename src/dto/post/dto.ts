import { PostModel } from '@/models/posts/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => ({
  id: post?.id || '',
  title: post?.title || '',
  slug: post?.slug || '',
  author: post?.author || '',
  excerpt: post?.excerpt || '',
  content: post?.content || '',
  coverImageUrl: post?.coverImageUrl || '',
  published: post?.published || false,
  createdAt: post?.createdAt || '',
});

export const makePublicPostFromDb = (post: PostModel): PublicPost =>
  makePartialPublicPost(post);
