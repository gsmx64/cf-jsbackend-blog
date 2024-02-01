import { PaginateConfig } from "nestjs-paginate";

import { POSTS_FILTER_CONFIG } from "../../posts/filters/posts.filter";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const SEARCH_POSTS_CONFIG = {
    ...POSTS_FILTER_CONFIG,
    searchableColumns: ['title', 'description', 'content'],
}  satisfies PaginateConfig<PostsEntity>

export const SEARCH_POSTS_CONFIG_LOW = {
    ...SEARCH_POSTS_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<PostsEntity>