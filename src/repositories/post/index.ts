import { JsonPostRepository } from "./json-post-reposiroy";
import { PostRepository } from "./post-respository";

export const postRepository: PostRepository = new JsonPostRepository();
