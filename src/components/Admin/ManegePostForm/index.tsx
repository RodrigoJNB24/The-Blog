'use client';

import { Button } from '@/components/Button';
import { UploaderImage } from '@/components/ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkDownEditor } from '@/components/MarkDownEditor';
import { ChangeEvent, useState } from 'react';

export function ManegePostForm() {
  const [contentValue, setContentValue] = useState('');
  const [inputTextValue, setInputTextValue] = useState({
    title: '',
    coverImageUrl: '',
    excerpt: '',
    slug: '',
    id: '',
  });


  const handleChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputTextValue(preStateValue => ({
      ...preStateValue,
      [name]: value
    }));
  }


  return (
    <form action='' className='mb-16'>
      <div className='py-16 flex flex-col gap-4 flex-wrap text-slate-950 pt-0'>
        <InputText
          labelText='Slug'
          name='slug'
          readOnly={true}
          placeholder='Slug gerada Automaticamente'
          onChange={handleChange}
          value={inputTextValue['slug']}
        />

        <InputText
          labelText='ID'
          name='id'
          readOnly={true}
          placeholder='ID gerado Automaticamente'
          onChange={handleChange}
          value={inputTextValue['id']}
        />

        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o titulo do Post'
          onChange={handleChange}
          value={inputTextValue['title']}
        />

        <MarkDownEditor
          textAreaName='content'
          labelText='Conteudo do Post'
          value={contentValue}
          setValue={setContentValue}
        />

        <UploaderImage />

        <InputText
          labelText='Capa do Post'
          name='coverImageUrl'
          placeholder='Digite a URL da capa do Post'
          onChange={handleChange}
          value={inputTextValue['coverImageUrl']}
        />

        <InputText
          labelText='Resumo do Post'
          name='excerpt'
          placeholder='Digite o resumo do Post'
          onChange={handleChange}
          value={inputTextValue['excerpt']}
        />

        <InputCheckBox labelText='Publicar?' name='published' />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
