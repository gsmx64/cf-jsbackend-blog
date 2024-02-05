import { PaginateConfig } from "nestjs-paginate";

import { PostsEntity } from "../entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const POSTS_SEARCH_CONFIG = {
    sortableColumns: [
        'id', 'title', 'status', 'author', 'category', 'createAt',
        'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    searchableColumns: ['title', 'description', 'content'],
    select: [
        'id', 'title', 'description', 'content', 'status', 'author',
        'category', 'comments', 'createAt', 'updateAt'
    ],
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    relations: {
        author: {},
        category: {},
        comments: {}
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<PostsEntity>

export const POSTS_SEARCH_CONFIG_LOW = {
    ...POSTS_SEARCH_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<PostsEntity>