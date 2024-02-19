import { PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for searching categories.
 */
export const CATEGORIES_SEARCH_CONFIG: PaginateConfig<CategoriesEntity> = {
    /**
     * List of sortable columns.
     */
    sortableColumns: [
        'id', 'title', 'status', 'author', 'createAt', 'updateAt'
    ],
    /**
     * Sort order for null values.
     */
    nullSort: 'last',
    /**
     * Default sort order.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of searchable columns.
     */
    searchableColumns: ['title', 'description'],
    /**
     * List of columns to select.
     */
    select: [
        'id', 'title', 'description', 'image', 'status', 'author',
        'posts', 'createAt', 'updateAt'
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
     * Whether to include deleted categories in the search.
     */
    withDeleted: false,
    /**
     * Relations to include in the search.
     */
    relations: {
        author: { posts: true },
        posts: { category: true }
    },
    /**
     * Whether to load eager relations.
     */
    loadEagerRelations: false,
    /**
     * Whether to use relative path for image.
     */
    relativePath: false,
};

/**
 * Configuration object for searching published categories.
 */
export const CATEGORIES_SEARCH_CONFIG_LOW: PaginateConfig<CategoriesEntity> = {
    ...CATEGORIES_SEARCH_CONFIG,
    /**
     * Filter condition for published categories.
     */
    where: { status: PUBLISH_STATUS.PUBLISHED },
};