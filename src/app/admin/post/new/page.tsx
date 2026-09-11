import { ManegePostForm } from '@/components/Admin/ManegePostForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Post',
};

export default async function AdminPostNewPage() {

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-extrabold self-center'>Criar Post</h2>
      <ManegePostForm />;
    </div>
  );
}
