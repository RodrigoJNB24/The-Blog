import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { drizzleDB } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { asyncDelay } from '@/utils/async_delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';

export class DrizzlepostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    // await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAllPublic');

    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    // await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findBySlugPublic', Date.now());

    const post = await drizzleDB.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    // await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAll');

    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    // await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findById', Date.now());

    const post = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }
}
