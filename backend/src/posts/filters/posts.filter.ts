import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { PostsEntity } from "../entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const POSTS_FILTER_CONFIG = {
    sortableColumns: [
        'id', 'title', 'status', 'author', 'category', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['createAt', 'DESC']],
    select: [
        'id', 'title', 'description', 'status', 'content', 'author',
        'category', 'createAt', 'updateAt'
    ],
    filterableColumns: {
        id: true,
        title: [FilterOperator.ILIKE],
        description: [FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterSuffix.NOT],
        content: [FilterOperator.ILIKE],
        author: [FilterOperator.ILIKE],
        category: [FilterOperator.ILIKE],
        createAt: [
            FilterOperator.BTW,
            FilterOperator.LT,
            FilterOperator.LTE,
            FilterOperator.GT,
            FilterOperator.GTE,
        ],
        updateAt: [
            FilterOperator.BTW,
            FilterOperator.LT,
            FilterOperator.LTE,
            FilterOperator.GT,
            FilterOperator.GTE,
        ],
    },
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    relations: {
        author: { posts: true },
        category: { posts: true },
        comments: { post: true }
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<PostsEntity>

export const POSTS_FILTER_CONFIG_LOW = {
    ...POSTS_FILTER_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<PostsEntity>