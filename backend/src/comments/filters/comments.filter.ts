import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { CommentsEntity } from "../entities/comments.entity";


export const COMMENTS_FILTER_CONFIG = {
    sortableColumns: [
        'id', 'message', 'author', 'post', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    select: [
        'id', 'message', 'reaction', 'author', 'post',
        'createAt', 'updateAt'
    ],
    filterableColumns: {
        id: true,
        message: [FilterOperator.ILIKE],
        author: [FilterOperator.ILIKE],
        post: [FilterOperator.ILIKE],
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
        author: { comments: true },
        post: { comments: true }
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<CommentsEntity>