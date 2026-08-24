'use client';
import clsx from 'clsx';

type DialogProps = {
  isVisible: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible,
  title,
  content,
  disabled,
  onCancel,
  onConfirm,
}: DialogProps) {
  if (!isVisible) return null;

  const handleCancel = () => {
    if (disabled) return;

    onCancel();
  };

  return (
    <div
      className={clsx(
        'fixed z-50 inset-0 bg-black/40 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 flex flex-col gap-6 items-center',
          'max-w-2xl rounded-2xl p-6 mx-6',
          'shadow-lg shadow-black/30 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-xl font-bold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex w-full justify-around items-center'>
          <button
            className={clsx(
              'bg-slate-300 hover:bg-slate-400 trasnsition text-slate-950',
              'flex items-center justify-center',
              'py-2 px-4 rounded-lg cursor-pointer',
              'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400',
            )}
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className={clsx(
              'bg-blue-600 hover:bg-blue-500 trasnsition text-blue-50',
              'flex items-center justify-center',
              'py-2 px-4 rounded-lg cursor-pointer',
              'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
