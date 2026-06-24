import PostDate from '../PostDate';
import PostHeading from '../PostHeading';

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
      <PostDate dateTime={createdAt} />
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
