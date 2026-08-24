'use client';

import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { deletePostAction } from '../../../actions/post/delete-post-action';
import { asyncDelay } from '@/utils/async_delay';
import { Dialog } from '@/components/Dialog';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCick = () => setShowDialog(true);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`Post deletado de id: ${result}`);
      asyncDelay(10000);
      setShowDialog(false);
    });
  };

  return (
    <>
      <button
        onClick={handleCick}
        className={clsx(
          'text-red-500',
          'cursor-pointer',
          'transition',
          '[&_svg]:w-4',
          '[&_svg]:h-4',
          'hover:scale-120',
          'hover:text-red-700',
          'disabled:text-slate-600',
          'disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={true}
          title='Apagar post?'
          content={`Realmente deseja apagar o Post: "${title}"?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => handleConfirm()}
          disabled={isPending}
        />
      )}
    </>
  );
}
