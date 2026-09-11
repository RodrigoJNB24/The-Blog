import z, { ZodError } from "zod";

export function getZodErrorMessages(
  errosZod: ZodError<{
    title: string;
    content: string;
    author: string;
    excerpt: string;
    coverImageUrl: string;
    published: boolean;
  }>,
) {
  const propertiesErros = z.treeifyError(errosZod).properties;
  if (!propertiesErros) return;

  return Object
  .values(propertiesErros)
  .map(propertie => propertie.errors)
  .flat()
  .filter(Boolean);
}
