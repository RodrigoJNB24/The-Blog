"use client";
import ErrorMessage from '@/components/ErrorMessage';

export default function RootErrorPage() {
  return (
    <>
      <ErrorMessage
        pageTitle='Página não encontrada'
        contentTitle='Erro 😢'
        content='Deu erro.'
      />
    </>
  );
}
