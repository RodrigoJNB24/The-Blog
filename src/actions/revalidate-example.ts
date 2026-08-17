'use server';

import { revalidateTag } from "next/cache";

export async function revalidateExampleAction(formData: FormData) {

  const path = formData.get('path') || '';
  console.log('Server Action', path);

  // revalidatePath(`${path}`)
  revalidateTag('posts', { expire: 0 });
  revalidateTag('post-organizacao-pessoal-por-onde-comecar', { expire: 0 });
}
