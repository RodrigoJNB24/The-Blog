import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import { SpinLoader } from '@/components/SpinLoader.tsx';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Este é meu blog',
    template: 'The Blog | %s ',
  },
  description: 'Descrição da pagina',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  'use cache';

  return (
    <html
      lang='pt-BR'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <Suspense fallback={<SpinLoader />}>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </Suspense>
      </body>
    </html>
  );
}
