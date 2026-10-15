'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async_delay';
import { redirect } from 'next/navigation';

type loginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  state: loginActionState,
  formData: FormData,
): Promise<loginActionState> {
  await asyncDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválido!',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite usuário e senha !',
    };
  }

  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos!',
    };
  }

  // TODO: Criar o cookie e redirecinar a página

  await createLoginSession(username)

  redirect('/admin/post')
}
