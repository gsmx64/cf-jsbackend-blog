import { PaginateConfig } from "nestjs-paginate";
import { CommentsEntity } from "../entities/comments.entity";


/**
 * Default configuration for comments pagination.
 */
export const COMMENTS_DEFAULT_CONFIG: PaginateConfig<CommentsEntity> = {
    /**
     * The columns that can be sorted.
     */
    sortableColumns: ['updateAt'],

    /**
     * The default sorting order for null values.
     */
    nullSort: 'last',

    /**
     * The default sorting criteria.
     */
    defaultSortBy: [['updateAt', 'DESC']],

    /**
     * The default number of items per page.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,

    /**
     * The maximum number of items per page.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,

    /**
     * Whether to include deleted comments in the results.
     */
    withDeleted: false,

    /**
     * Whether to load eager relations.
     */
    loadEagerRelations: false,

    /**
     * Whether to use relative path for pagination links.
     */
    relativePath: false,
};