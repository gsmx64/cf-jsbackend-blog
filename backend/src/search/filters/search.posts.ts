import { PaginateConfig } from "nestjs-paginate";

import { POSTS_SEARCH_CONFIG } from "../../posts/filters/posts.search";
import { PostsEntity } from "../../posts/entities/posts.entity";


export const SEARCH_POSTS_CONFIG = {
    ...POSTS_SEARCH_CONFIG,

}  satisfies PaginateConfig<PostsEntity>