'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/Button';
import { UploaderImage } from '@/components/ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkDownEditor } from '@/components/MarkDownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { toastifyAdapter } from '@/lib/adapters/toastAdapter';
import { useActionState, useEffect, useState } from 'react';

type ManegePostFormProps = {
  publicPost?: PublicPost;
};

export function ManegePostForm({ publicPost }: ManegePostFormProps) {
  const [content, setContent] = useState(publicPost?.content || '');

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPading] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState, errors } = state;

  useEffect(() => {
    if(errors.length < 0)
    toastifyAdapter.dismiss()

    errors.forEach(message => {
      toastifyAdapter.error(message)
    });
    
  }, [errors]);

  return (
    <form action={action} className='mb-16'>
      <div className='py-16 flex flex-col gap-4 flex-wrap text-slate-950 pt-0'>
        <InputText
          labelText='Slug'
          name='slug'
          readOnly={true}
          placeholder='Slug gerada Automaticamente'
          defaultValue={formState.slug}
        />

        <InputText
          labelText='ID'
          name='id'
          readOnly={true}
          placeholder='ID gerado Automaticamente'
          defaultValue={formState.id}
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o autor do Post'
          defaultValue={formState.author}
        />

        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o titulo do Post'
          defaultValue={formState.title}
        />

        <MarkDownEditor
          textAreaName='content'
          labelText='Conteudo do Post'
          value={content}
          setValue={setContent}
        />

        <UploaderImage />

        <InputText
          labelText='Capa do Post'
          name='coverImageUrl'
          placeholder='Digite a URL da capa do Post'
          defaultValue={formState.coverImageUrl}
        />

        <InputText
          labelText='Resumo do Post'
          name='excerpt'
          placeholder='Digite o resumo do Post'
          defaultValue={formState.excerpt}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          defaultChecked={formState.published}
        />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
