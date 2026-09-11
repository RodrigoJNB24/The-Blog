import slugify from 'slugify';

export function makeSlugfromText(title: string) {
  return slugify(title, {
    lower: true,
    trim: true,
    strict: true
  });
}
