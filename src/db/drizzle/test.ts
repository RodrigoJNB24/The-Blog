import { eq } from 'drizzle-orm';
import { drizzleDB } from '.';
import { postsTable } from './schemas';

(async () => {
  await drizzleDB
    .update(postsTable)
    .set({
      title: '10 hábitos para aumentar sua produtividade',
      published: true,
    })
    .where(eq(postsTable.slug, '10-habitos-para-aumentar-sua-produtividade'));

  // posts.forEach(post => console.log(post.slug));
})();
