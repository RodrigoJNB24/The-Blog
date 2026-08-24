import { postRepository } from '@/repositories/post';
import { cacheLife } from 'next/cache';
import { cache } from 'react';

export const findPostByIdAdminCached = cache(async (id: string) => {
  'use cache';
  cacheLife({ revalidate: 60 });
  return await postRepository.findById(id);
});

export const findAllPostsAdmin = cache(async () => {
  'use cache';
  cacheLife({ revalidate: 60 });
  return await postRepository.findAll();
});
