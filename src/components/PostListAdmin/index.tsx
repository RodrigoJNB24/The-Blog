import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../Admin/DeletePostButton';

export async function PostListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='mb-16'>
      {posts.map(({ id, title, published }) => {
        const isPublished = !published ? 'bg-slate-300' : '';
        return (
          <div
            className={clsx(
              'py-2 px-2',
              isPublished,
              'flex gap-2 items-center justify-between',
            )}
            key={id}
          >
            <Link href={`/admin/post/${id}`}>{title}</Link>

            {!published && (
              <span className='text-x5 text-slate-600 px-2 italic'>
                (Não publicado)
              </span>
            )}

            <DeletePostButton id={id} title={title} />
          </div>
        );
      })}
      
    </div>
  );
}
