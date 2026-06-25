import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
}

export default function ErrorMessage({ pageTitle, contentTitle, content }: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div
        className={clsx(
          'min-h-80',
          'bg-slate-900',
          'text-slate-100',
          'mb-16',
          'p-8',
          'rounded-xl',
          'flex justify-center items-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-4xl/tight mb-4'>{contentTitle}</h1>
          <div>
            <p>
              {content}
            </p>
            <p className='mt-8'>
              Voltar para o{' '}
              <span className='underline'>
                <Link href='/'>The Blog</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
