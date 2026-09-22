import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { drizzleDB } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

export class DrizzlepostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    
    logColor('findAllPublic');

    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    
    logColor('findBySlugPublic', Date.now());

    const post = await drizzleDB.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    
    // logColor('findAll');

    const posts = await drizzleDB.query.posts.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    
    logColor('findById', Date.now());

    const post = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExist = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq, or }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExist) {
      throw new Error('Post com ID ou Slug já existe na base de dados.');
    }

    await drizzleDB.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string) {
    const post = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe na base de dados.');
    }

    await drizzleDB.delete(postsTable).where(eq(postsTable.id, id));
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe na base de dados.');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    }

    await drizzleDB.update(postsTable).set(postData).where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };

  }
}
