'use client';

import clsx from 'clsx';
import { useId } from 'react';

type InputCheckBoxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckBox({
  labelText,
  type = 'checkbox',
  ...props
}: InputCheckBoxProps) {
  const id = useId();

  const inputCheckBoxClasses = clsx(
    'focus:ring-2 focus:ring-blue-500',
    'w-4 h-4',
    'outline-none ',
  );

  return (
    <div className='flex flex-row items-center gap-3'>
      <input
        {...props}
        className={clsx(inputCheckBoxClasses)}
        type={type}
        id={id}
      />
      {labelText && (
        <label className='text-base' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
