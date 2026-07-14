import { DrizzlepostRepository } from "./drizzle-post-repository";
import { PostRepository } from "./post-respository";

export const postRepository: PostRepository = new DrizzlepostRepository();
