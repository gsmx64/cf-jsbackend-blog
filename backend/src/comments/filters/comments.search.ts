import { PaginateConfig } from "nestjs-paginate";

import { CommentsEntity } from "../entities/comments.entity";


/**
 * Configuration object for searching comments.
 */
export const COMMENTS_SEARCH_CONFIG: PaginateConfig<CommentsEntity> = {
    /**
     * List of sortable columns for comments.
     */
    sortableColumns: [
        'id', 'message', 'author', 'post', 'createAt', 'updateAt'
    ],
    /**
     * Sort order when sorting by null values.
     */
    nullSort: 'last',
    /**
     * Default sorting criteria for comments.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of searchable columns for comments.
     */
    searchableColumns: ['message'],
    /**
     * List of columns to select when querying comments.
     */
    select: [
        'id', 'message', 'reaction', 'author', 'post',
        'createAt', 'updateAt'
    ],
    /**
     * Default limit for pagination.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    /**
     * Maximum limit for pagination.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    /**
     * Whether to include deleted comments in the results.
     */
    withDeleted: false,
    /**
     * Relations to include when querying comments.
     */
    relations: {
        author: { comments: true },
        post: { comments: true }
    },
    /**
     * Whether to load eager relations when querying comments.
     */
    loadEagerRelations: false,
    /**
     * Whether to use relative path for file references.
     */
    relativePath: false,
};