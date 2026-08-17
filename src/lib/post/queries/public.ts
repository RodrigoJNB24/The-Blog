'use cache';

import { PostModel } from '@/models/posts/post-model';
import { postRepository } from '@/repositories/post';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(async () => {
  cacheLife({ revalidate: 60 });
  cacheTag('posts');

  return await postRepository.findAllPublic();
})

export const findPublicSlugPostsCached = cache(async (slug: string) => {
  cacheLife({ revalidate: 60 });
  cacheTag(`post-${slug}`);

  const post = (await postRepository
    .findBySlugPublic(slug)
    .catch(() => null)) as PostModel | null;

  if (!post) notFound();

  return post;
});
