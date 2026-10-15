'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { InputText } from '@/components/InputText';
import { toastifyAdapter } from '@/lib/adapters/toastAdapter';
import { useActionState, useEffect } from 'react';
import { LogInIcon } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPading] = useActionState(loginAction, initialState);


  useEffect(() => {
    if (!state.error) return;
    toastifyAdapter.dismiss();
    toastifyAdapter.error(state.error);
  }, [state.error]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <div className='flex flex-col gap-7 w-64'>
          <InputText
            labelText='Usuário'
            name='username'
            type='text'
            placeholder='Seu usuário'
            defaultValue={state.username}
            disabled={isPading}
          />
          <InputPassword
            labelText='Senha'
            type='password'
            name='password'
            placeholder='Sua senha'
            disabled={isPading}
          />
        </div>
        <div className='flex justify-between gap-4'>
          <Button variant='ghost' type='button' disabled={isPading}>
            <Link href='/'>Cancelar</Link>
          </Button>
          <Button variant='default' type='submit' disabled={isPading}>
            <LogInIcon />
            Enviar
          </Button>
        </div>
        {!!state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  );
}
