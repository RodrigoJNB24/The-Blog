import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <ErrorMessage
        pageTitle='Página não encontrada'
        contentTitle='404 | Not Found 😢'
        content={
          <div className='mt-8'>
            <p>
              Erro 404 - A página que você está tentando acessar não existe
              neste site.
            </p>
            <p>
              Voltar para o{' '}
              <span className='underline'>
                <Link href='/'>The Blog</Link>
              </span>
            </p>
          </div>
        }
      />
    </>
  );
}
