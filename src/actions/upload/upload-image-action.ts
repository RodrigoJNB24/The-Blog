'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { makeUrlImage } from '@/utils/make-url-image';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos.' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido.' });
  }

  if (file.size > uploadMaxSize) {
    return makeResult({
      error: 'Imagem muito grande.',
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      error: 'Tipo de arquivo incompativel.',
    });
  }

  const url = await makeUrlImage(file);

  return makeResult({ url });
}
