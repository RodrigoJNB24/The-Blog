import { PostHeading } from '../PostHeading';
import { formatDatetime, formatDistanceToNow } from '@/utils/format-datetime';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({ postLink, postHeading, createdAt, title, excerpt }: PostSummaryProps) {
  return (
    <div className='flex flex-col justify-center gap-4'>
      <time
        className='text-slate-600 text-sm/tight block'
        dateTime={createdAt}
        title={formatDistanceToNow(createdAt)}
      >
        {formatDatetime(createdAt)}
      </time>

      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
