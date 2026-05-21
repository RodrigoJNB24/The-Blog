'use client';

import clsx from "clsx";

export function Header() {
  console.log("client")
  return (
    <h1
      className={clsx(
        'text-6xl',
        'font-bold',
        'text-blue-200',
        'hover:text-blue-500',
        'transition',
        'duration-500',
        'ease-in-out',
        'brightness-100',
      )}
      onClick={() => alert(123)}
    >
      Hello de page.tsx
    </h1>
  );
}
