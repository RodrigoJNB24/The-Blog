import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'node:path';

const simulateWaitInMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;
export const JSON_POST_FILE_PATH = resolve(
  process.cwd(),
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (simulateWaitInMs <= 0) return;

    await new Promise(resolve => setTimeout(resolve, simulateWaitInMs));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonPosts = await readFile(JSON_POST_FILE_PATH, 'utf-8');
    const { posts } = await JSON.parse(jsonPosts);
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts.filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await this.simulateWait();

    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post não enconstrado para slug');

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExist = await this.findById(post.id);

    if (postExist) {
      throw new Error('Post já existe na base de dados');
    }

    const posts = await this.findAll();
    const postsJSON = JSON.stringify(posts.push(post));
    await writeFile(JSON_POST_FILE_PATH, postsJSON);

    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await this.findById(id);

    if (!post) {
      throw new Error('Post não existe na base de dados');
    }

    const posts = await this.findAll();
    const indexPost = posts.indexOf(post);

    const postsJSON = JSON.stringify(posts.toSpliced(indexPost, 1));
    await writeFile(JSON_POST_FILE_PATH, postsJSON);

    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await this.findById(id);

    if (!oldPost) {
      throw new Error('Post não existe na base de dados');
    }

    const posts = await this.findAll();
    const newPosts = posts.map(post => {
      if (post.id === oldPost.id) {
        return { ...post, ...newPostData };
      }
      return post;
    });

    const postsJSON = JSON.stringify(newPosts);

    await writeFile(JSON_POST_FILE_PATH, postsJSON);

    return {
      ...oldPost,
      ...newPostData,
    };
  }
}
