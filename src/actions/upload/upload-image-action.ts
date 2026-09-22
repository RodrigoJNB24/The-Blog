'use server';

import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const uploadDir =
  process.env.IMAGE_UPLOADER_DIRECTORY ?? 'uploads';

const imgServerUrl =
  process.env.IMAGE_SERVER_URL ?? 'http://localhost:3000/uploads';

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

async function makeDirectoryImage() {
  const fullPathName = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(fullPathName, {
    recursive: true,
  });

  return fullPathName;
}

async function makeFileNameImage(fileName: string) {
  const extentionName = extname(fileName);
  const uniqueNameImage = `${randomUUID()}${extentionName}`;

  return uniqueNameImage.replaceAll('-', '');
}

async function makeUrlImage(file: File) {
  const uploaderFullPath = await makeDirectoryImage();
  const uniqueNameImage = await makeFileNameImage(file.name);
  const fileFullPath = resolve(uploaderFullPath, uniqueNameImage);

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  writeFile(fileFullPath, buffer);

  return `${imgServerUrl}/${uniqueNameImage}`;
}

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // TODO: Verificar login do usuario

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

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
