'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <ErrorMessage
        pageTitle='Error Interno'
        contentTitle='501 | Error Internal Server 😢'
        content={<p>Tente Novamente Mais Tarde.</p>}
      />
    </>
  );
}
