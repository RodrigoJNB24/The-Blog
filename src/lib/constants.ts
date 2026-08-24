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
