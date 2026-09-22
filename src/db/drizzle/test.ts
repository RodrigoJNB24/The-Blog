import { eq } from 'drizzle-orm';
import { drizzleDB } from '.';
import { postsTable } from './schemas';

(async () => {
  await drizzleDB
    .update(postsTable)
    .set({
      title: 'Organização pessoal: por onde começar',
      published: false,
    })
    .where(eq(postsTable.slug, 'organizacao-pessoal-por-onde-comecar'));

})();
