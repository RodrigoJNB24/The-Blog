'use server';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // TODO: verificar se o usuario esta logado
  /******************************************/

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  let post;

  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: 'Error não identificado',
    };
  }

  revalidateTag('posts', { expire: 0 });
  revalidateTag(`post-${post.slug}`, { expire: 0 });

  return {
    error: '',
  };
}
