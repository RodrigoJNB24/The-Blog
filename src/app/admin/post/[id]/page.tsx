import { ManegePostForm } from "@/components/Admin/ManegePostForm";
import { makePublicPostFromDb } from "@/dto/post/dto";
import { findPostByIdAdminCached } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type AdminPostPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Editar Post',
};

export default async function AdminPostPage({ params }: AdminPostPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdminCached(id);

  if(!post) notFound();

  const publicPost = makePublicPostFromDb(post)

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-extrabold self-center'>Editar Post</h2>
      <ManegePostForm publicPost={publicPost} mode='update'/>
    </div>
  );
}
