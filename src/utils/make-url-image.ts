import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const imgServerUrl =
  process.env.IMAGE_SERVER_URL ?? 'http://localhost:3000/uploads';

const uploadDir = process.env.IMAGE_UPLOADER_DIRECTORY ?? 'uploads';
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

export async function makeUrlImage(file: File) {
  const uploaderFullPath = await makeDirectoryImage();
  const uniqueNameImage = await makeFileNameImage(file.name);
  const fileFullPath = resolve(uploaderFullPath, uniqueNameImage);

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  writeFile(fileFullPath, buffer);

  return `${imgServerUrl}/${uniqueNameImage}`;
}
