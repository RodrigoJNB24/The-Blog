'use Client';

import clsx from 'clsx';

type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
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
            <>{content}</>
          </div>
        </div>
      </div>
    </>
  );
}
