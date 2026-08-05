import { formatDatetime, formatDistanceToNow } from '@/utils/format-datetime';

type PostDateProps = {
  dateTime: string;

};

export default async function PostDate({ dateTime }: PostDateProps) {
  const formatDistanceTime = await formatDistanceToNow(dateTime)
  return (
    <time
      className='text-slate-600 text-sm/tight'
      dateTime={dateTime}
      title={formatDistanceTime}
    >
      {formatDatetime(dateTime)}
    </time>
  );
}
