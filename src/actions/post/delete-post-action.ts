'use server';

import { drizzleDB } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // TODO: Checar login do usuario

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }
  const post = await postRepository.findById(id).catch(() => null);

  if (!post) {
    return {
      error: 'Post não existe',
    };
  }

  // TODO: Mover este metodo para o Repositorio
  await drizzleDB.delete(postsTable).where(eq(postsTable.id, id));

  revalidateTag('posts', { expire: 0 });
  revalidateTag(`post-${post.slug}`, { expire: 0 });

  return {
    error: '',
  };
}
