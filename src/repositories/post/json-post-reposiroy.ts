import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { resolve } from 'node:path';
import { readFile } from 'fs/promises';


const ROOT_DIR = process.cwd();
const JSON_POST_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonPosts = await readFile(JSON_POST_FILE_PATH, 'utf-8');
    const { posts } = await JSON.parse(jsonPosts);
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll()
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não enconstrado');

    return post;
  }
}
