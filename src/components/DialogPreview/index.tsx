'use client';
import clsx from 'clsx';
import { Button } from '../Button';
import { CircleXIcon } from 'lucide-react';


type DialogProps = {
  src: string;
  onCancel: () => void;
  isVisible: boolean;
} & React.ComponentProps<'img'>;

export function PreviewImage({ onCancel, isVisible, ...props }: DialogProps) {
  const handleCancel = () => onCancel();

  return (
    <div
      className={clsx(
        'bg-cover bg-center',
        'fixed z-50 inset-0 bg-black/40 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-cover bg-center grow',
          'max-w-2xl min-h-96 rounded-2xl p-6 mx-6',
          'shadow-lg shadow-black/30 text-center',
        )}
        style={{ backgroundImage: `url('${props.src}')` }}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex w-full justify-end items-end'>
          <Button
            type='button'
            variant='ghost'
            size='md'
            autoFocus
            onClick={handleCancel}
          >
            <CircleXIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
