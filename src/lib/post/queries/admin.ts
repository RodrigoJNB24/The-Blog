import { postRepository } from '@/repositories/post';
import { cacheLife } from 'next/cache';
import { cache } from 'react';

export const findPostByIdAdminCached = cache(async (id: string) => {
  'use cache';
  cacheLife({ revalidate: 0 });
  return await postRepository.findById(id);
});

export const findAllPostsAdminCached = cache(async () => {
  'use cache';
  cacheLife({ revalidate: 0 });
  return await postRepository.findAll();
});
