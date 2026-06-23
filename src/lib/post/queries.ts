import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublic(),
);

export const findBySlugPostsCached = cache(
  async (slug: string) => await postRepository.findBySlug(slug),
);

export const findByIdPostsCached = cache(
  async (id: string) => await postRepository.findById(id),
);
