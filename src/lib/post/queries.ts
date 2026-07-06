import { PostModel } from '@/models/posts/post-model';
import { postRepository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublic(),
);

export const findBySlugPostsCached = cache(
  async (slug: string) => {
    const post = await postRepository.findBySlug(slug).catch(() => null) as PostModel | null

    if (!post) notFound();

    return post;
  }
);

export const findByIdPostsCached = cache(
  async (id: string) => await postRepository.findById(id),
);
