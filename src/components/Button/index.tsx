'use client';

import clsx from 'clsx';

type ButtonVariant = 'default' | 'danger' | 'ghost';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariant, string> = {
    default: clsx(
      'bg-slate-950 text-slate-100 hover:bg-slate-800 hover:scale-95',
    ),
    ghost: clsx(
      'bg-slate-200 text-slate-950 hover:bg-slate-200/70 hover:scale-95',
    ),
    danger: clsx(
      'bg-red-600 text-slate-100 hover:text-slate-200 hover:scale-95',
    ),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    lg: clsx(
      'text-lg/tight',
      'py-4 px-6',
      '[&_svg]:w-5 [&_svg]:h-5 gap-3',
      'rounded-lg',
    ),
    md: clsx(
      'text-base/tight',
      'py-2 px-4',
      '[&_svg]:w-4 [&_svg]:h-4 gap-2',
      'rounded-md',
    ),
    sm: clsx(
      'text-xs/tight',
      'py-1 px-2',
      '[&_svg]:w-3 [&_svg]:h-3 gap-1',
      'rounded-sm',
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    'flex items-center justify-center',
    'transition',
    'cursor-pointer',
    'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400',
    props.className,
  );

  return <button {...props} className={buttonClasses}  />;
}
