import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { drizzleDB } from '@/db/drizzle';

export class DrizzlepostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDB.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }
}
