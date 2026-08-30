'use client';

import { Button } from '@/components/Button';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkDownEditor } from '@/components/MarkDownEditor';
import { useState } from 'react';

export function ManegePostForm() {
  const [contentValue, setContentValue] = useState('');
  return (
    <form action='' className='mb-16'>
      <div className='py-16 flex flex-col gap-4 flex-wrap text-slate-950 pt-0'>
        <InputText labelText='Nome' placeholder='Digite seu nome' />
        <InputText
          labelText='Sobrenome'
          disabled={true}
          placeholder='Digite seu sobrenome'
          defaultValue={'asdasdasd'}
        />
        <InputText
          onChange={e => console.log(e)}
          labelText='Nome'
          placeholder='Digite seu nome'
          disabled={false}
        />
        <InputCheckBox labelText='Sobrenome' />
        <InputText
          labelText='Sobrenome'
          disabled={true}
          placeholder='Digite seu sobrenome'
          defaultValue={'asdasdasd'}
        />
        <InputText
          labelText='Sobrenome'
          disabled={true}
          placeholder='Digite seu sobrenome'
          defaultValue={'asdasdasd'}
        />
        <InputText
          labelText='Sobrenome'
          disabled={true}
          placeholder='Digite seu sobrenome'
          defaultValue={'asdasdasd'}
        />

        <MarkDownEditor
          setValue={setContentValue}
          value={contentValue}
          textAreaName='Editor'
          labelText='Conteúdo'
        />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
