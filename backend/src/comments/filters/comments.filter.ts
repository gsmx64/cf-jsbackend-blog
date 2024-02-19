import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { CommentsEntity } from "../entities/comments.entity";


/**
 * Configuration object for filtering and paginating comments.
 */
export const COMMENTS_FILTER_CONFIG: PaginateConfig<CommentsEntity> = {
    /**
     * List of sortable columns.
     */
    sortableColumns: [
        'id', 'message', 'author', 'post', 'createAt', 'updateAt'
    ],
    /**
     * Specifies the default sorting order for null values.
     */
    nullSort: 'last',
    /**
     * Specifies the default sorting order for the results.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of columns to select in the query results.
     */
    select: [
        'id', 'message', 'reaction', 'author', 'post',
        'createAt', 'updateAt'
    ],
    /**
     * Defines the filterable columns and the supported filter operators for each column.
     */
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
    /**
     * Specifies the default limit for pagination.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    /**
     * Specifies the maximum limit for pagination.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    /**
     * Specifies whether to include deleted records in the results.
     */
    withDeleted: false,
    /**
     * Defines the relations to be included in the query results.
     */
    relations: {
        author: { comments: true },
        post: { comments: true }
    },
    /**
     * Specifies whether to load eager relations.
     */
    loadEagerRelations: false,
    /**
     * Specifies whether to use relative path for pagination links.
     */
    relativePath: false,
};