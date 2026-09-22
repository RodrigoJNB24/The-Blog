import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import { isUuid } from '@/utils/uuid-validate';
import sanitizeHTML from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no minimo 3 caracteres.')
    .max(120, 'Título deve ter um máximo de 120 caracteres'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo é obrigatorio!')
    .transform(val => sanitizeHTML(val)),
  author: z
    .string()
    .trim()
    .min(2, 'Autor deve ter, no minimo 2 caracteres.')
    .max(100, 'Nome do autor, não deve ter mais que 100 caracteres.'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'O resumo precisa de no mínimo 3 caracteres')
    .max(200, 'O resumo não deve ter mais que 200 caractere'),
  coverImageUrl: z
    .string()
    .trim()
    .refine(val => isUrlOrRelativePath(val), {
      message: 'URL da capa deve ser uma URL ou caminho para imagem',
    }),
  published: z.union([
    z.literal('on'),
    z.literal('true'),
    z.literal(true),
    z.literal(false),
    z.literal('false'),
    z.literal(null),
    z.literal(undefined),
  ])
  .default(false)
  .transform(val => val === 'on' || val === true || val === 'true')
});

export const PostCreateSchema = PostBaseSchema;
export const PostUpdateSchema = PostBaseSchema.extend({
  id: z.string().trim().refine(val => isUuid(val))
})


