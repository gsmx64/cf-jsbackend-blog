import { PaginateConfig } from "nestjs-paginate";

import { POSTS_FILTER_CONFIG } from "../../posts/filters/posts.filter";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for searching posts.
 */
export const SEARCH_POSTS_CONFIG: PaginateConfig<PostsEntity> = {
    ...POSTS_FILTER_CONFIG,
    searchableColumns: ['title', 'description', 'content'],
};

/**
 * Configuration object for low roles for searching posts.
 */
export const SEARCH_POSTS_CONFIG_LOW: PaginateConfig<PostsEntity> = {
    ...SEARCH_POSTS_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
};