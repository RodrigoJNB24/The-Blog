'use client';

import clsx from 'clsx';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useId, useState } from 'react';

type InputPasswordProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputPassword({ labelText, ...props }: InputPasswordProps) {
  const id = useId();

  const inputPasswordClasses = clsx(
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

  const [isVisibility, setIsVisibility] = useState(false);
  const [typeInput, setTypeInput] = useState<'password' | 'text'>('password');
  // const [inputValue, setInputValue] = useState(props.value || '');

  const handleToggleClick = () => {
    if (typeInput === 'password') {
      setTypeInput('text');
      setIsVisibility(true);
    } else {
      setTypeInput('password');
      setIsVisibility(false);
    }
    return;
  };

  return (
    <div className='flex flex-col gap-2 relative'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={inputPasswordClasses}
        name='password'
        // value={inputValue}
        id={id}
        type={typeInput}
        maxLength={20}
        // onChange={e => setInputValue(e.target.value)}
        defaultValue={props.defaultValue}
      />
      <div
        className='absolute right-2 top-9 hover:cursor-pointer'
        onClick={handleToggleClick}
      >
        {isVisibility && <EyeIcon />}
        {!isVisibility && <EyeOffIcon />}
      </div>
    </div>
  );
}
