'use client';

import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId();

  const inputTextClasses = clsx(
    'ring-2 ring-slate-400 bg-white rounded-sm',
    'p-2 outline-0 transition',
    'focus:ring-blue-600',
    'placeholder-slate-300',
    'disabled:bg-slate-200',
    'disabled:text-slate-400',
    'disabled:placeholder-slate-400',
    'disabled:text-slate-400',
    'read-only:bg-slate-100',
    props.className,
  );

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input {...props} className={inputTextClasses} id={id} type='text' />
    </div>
  );
}
