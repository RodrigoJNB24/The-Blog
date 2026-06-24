import clsx from 'clsx';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada</title>
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
          <h1 className='text-4xl/tight mb-4'>404 | Not Found</h1>
          <p>
            Erro 404 - A página que você está tentando acessar não existe neste
            site.
          </p>
          <p className='mt-8'>
            Voltar para o{' '}
            <span className='underline'>
              <Link href='/'>The Blog</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
