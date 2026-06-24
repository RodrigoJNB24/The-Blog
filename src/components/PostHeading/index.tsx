import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export default function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {

  const headingClassesMap = {
    h1: 'text-3xl/tight sm:text-4xl',
    h2: 'text-2xl/tight sm:text-3xl',
  };

  const commonClasses = 'font-bold';

  return (
    <Tag className={clsx(headingClassesMap[Tag], commonClasses)}>
      <Link className='group-hover:text-slate-700 transition-discrete' href={url}>{children}</Link>
    </Tag>
  );
}
