type PostFeaturesProps = {
  children: React.ReactNode;
  time: string;
};

function formatTime(time: Date) {
  return new Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(time).replace(',', '');
}

export function PostFeatures({ children, time }: PostFeaturesProps) {
  return (
    <div className='flex flex-col justify-center gap-4'>
      <time
        className='text-slate-600 text-sm/tight block'
        dateTime='2026-06-02'
      >
        {formatTime(new Date(time))}
      </time>

      {children}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nobis
        ad. Dolores fugiat dolorem at enim nisi, quo sapiente eos tempora,
        laboriosam rem explicabo, et molestiae quisquam maxime aperiam fugit!
      </p>
    </div>
  );
}
