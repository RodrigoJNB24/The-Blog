import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { drizzleDB } from '@/db/drizzle';

export class DrizzlepostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    console.log('Drizzle FindAll');
    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log('Drizzle FindSlug');
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

// be3f14a1-0105-4e2e-bfc9-133a05e7bda6
// 6b204dab-2312-4525-820a-a0463560835f
