import { PostModel } from '@/models/posts/post-model';
import { PostRepository } from './post-respository';
import { readFile } from 'fs/promises';
import { JSON_POST_FILE_PATH, SIMULATE_WAIT_IN_MS } from '@/lib/constants';

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
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

    console.log('### FindAll ###');
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
}
