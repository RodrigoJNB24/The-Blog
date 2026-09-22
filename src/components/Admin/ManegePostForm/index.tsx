'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';
import { Button } from '@/components/Button';
import { UploaderImage } from '@/components/ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkDownEditor } from '@/components/MarkDownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { toastifyAdapter } from '@/lib/adapters/toastAdapter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

type PostActionMode = 'create' | 'update';

type ManegePostFormProps = {
  publicPost?: PublicPost;
  mode?: PostActionMode;
};

export function ManegePostForm({
  publicPost,
  mode = 'create',
}: ManegePostFormProps) {
  const [content, setContent] = useState(publicPost?.content ?? '');
  const searchParams = useSearchParams();
  const isCreated = searchParams.get('created');
  const router = useRouter();
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const actionPostMap = {
    create: createPostAction,
    update: updatePostAction,
  };

  const [state, action, isPading] = useActionState(
    actionPostMap[mode],
    initialState,
  );

  const { formState, errors, sucess } = state;

  useEffect(() => {
    if (errors.length < 0) toastifyAdapter.dismiss();

    errors.forEach(message => {
      toastifyAdapter.error(message);
    });
  }, [errors]);

  useEffect(() => {
    if (sucess) {
      toastifyAdapter.dismiss();
      toastifyAdapter.sucess('Post atualizado com sucesso');
    }
  }, [sucess]);

  useEffect(() => {
    if (isCreated === '1') {
      toastifyAdapter.dismiss();
      toastifyAdapter.sucess('Post criado com sucesso!');

      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [isCreated, router]);

  return (
    <form action={action} className='mb-16'>
      <div className='py-16 flex flex-col gap-4 flex-wrap text-slate-950 pt-0'>
        <InputText
          labelText='Slug'
          name='slug'
          readOnly={true}
          placeholder='Slug gerada Automaticamente'
          defaultValue={formState.slug}
          disabled={isPading}
        />

        <InputText
          labelText='ID'
          name='id'
          readOnly={true}
          placeholder='ID gerado Automaticamente'
          defaultValue={formState.id}
          disabled={isPading}
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o autor do Post'
          defaultValue={formState.author}
          disabled={isPading}
        />

        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o titulo do Post'
          defaultValue={formState.title}
          disabled={isPading}
        />

        <MarkDownEditor
          textAreaName='content'
          labelText='Conteudo do Post'
          value={content}
          setValue={setContent}
          disabled={isPading}
        />

        <UploaderImage isSending={isPading} />

        <InputText
          labelText='Capa do Post'
          name='coverImageUrl'
          placeholder='Digite a URL da capa do Post'
          defaultValue={formState.coverImageUrl}
          disabled={isPading}
        />

        <InputText
          labelText='Resumo do Post'
          name='excerpt'
          placeholder='Digite o resumo do Post'
          defaultValue={formState.excerpt}
          disabled={isPading}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          defaultChecked={formState.published}
          disabled={isPading}
        />

        <div className='mt-4'>
          <Button disabled={isPading} type='submit'>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
