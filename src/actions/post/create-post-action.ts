'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/posts/post-model';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlugfromText } from '@/utils/make-slug-from-text';
import { randomUUID } from 'node:crypto';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuario esta logado
  const errors: string[] = [];

  if (!(formData instanceof FormData)) {
    errors.push('Dados inválidos');
    return {
      formState: prevState.formState,
      errors,
    }
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!(zodParsedObj.success)) {
    const errors = getZodErrorMessages(zodParsedObj.error) ?? [];

    console.log(formDataToObj.author);

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: randomUUID(),
    slug: makeSlugfromText(validPostData.title)
  };

  return {
    formState: newPost,
    errors,
  };
}
