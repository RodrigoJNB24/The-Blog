'use client';
import clsx from 'clsx';
import {
  CirclePlusIcon,
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuSquareIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    console.log(pathname)
  },[pathname])

  const navClasses = clsx(
    'bg-slate-950 text-slate-100 rounded-lg',
    'flex flex-col m-8',
    !isOpen && 'overflow-hidden',
    !isOpen && 'h-8',
    'sm:flex-wrap sm:flex-row',
    'sm:h-auto sm:overflow-visible-y',
  );

  const linkClasses = clsx(
    '[&>svg]:w-4 [&>svg]:h-4 px-4 h-8 flex transition hover:bg-slate-800',
    'gap-2 items-center justify-start shrink-0',
  );

  const buttonClass = clsx(
    '[&>svg]:w-4 [&>svg]:h-4 px-4 h-8 flex transition hover:bg-slate-800 text-slate-400 italic',
    'gap-2 items-center justify-start shrink-0 cursor-pointer',
    'sm:hidden',
  );

  return (
    <nav className={clsx(navClasses)}>
      <button className={clsx(buttonClass)} onClick={() => setIsOpen(s => !s)}>
        {!isOpen && (
          <>
            <MenuSquareIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a className={clsx(linkClasses)} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={clsx(linkClasses)} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>
      <Link className={clsx(linkClasses)} href='/admin/post/new'>
        <CirclePlusIcon />
        Criar post
      </Link>
    </nav>
  );
}
