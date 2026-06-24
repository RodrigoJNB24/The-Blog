
type ConeinerProps = {
  children: React.ReactNode
}

export function Container({ children }: ConeinerProps) {
  return (
    <div className='text-slate-900 bg-slate-300 min-h-screen'>
      <div className='max-w-5xl mx-auto px-8'>{children}</div>
    </div>
  );
}
