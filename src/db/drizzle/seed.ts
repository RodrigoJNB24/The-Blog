import { JsonPostRepository } from "@/repositories/post/json-post-reposiroy";
import { drizzleDB } from ".";
import { postsTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll()

  try {
    await drizzleDB.delete(postsTable);
    await drizzleDB.insert(postsTable).values(posts)

  } catch(e) {
    console.log(e)
  }
})()


// const posts = await drizzleDB.select().from(postsTable)
// posts.forEach(({title}) => console.log(title))
