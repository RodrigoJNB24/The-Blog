import { resolve } from "node:path";

export const SIMULATE_WAIT_IN_MS = 100;

export const ROOT_DIR = process.cwd();

export const JSON_POST_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export const IMAGE_UPLOADER_MAX_SIZE = 921600;


export const IMAGE_UPLOADER_DIRECTORY = 'uploads'
export const IMAGE_SERVER_URL = 'http://localhost:3000/uploads' // https://localhost:3000/uploaders/image.jpg
