import slugify from 'slugify';
import { makeRandomString } from './make-random-string';

export function makeSlugfromText(title: string) {
  const slug = slugify(title, {
    lower: true,
    trim: true,
    strict: true
  });
  return `${slug}-${makeRandomString()}`
}
