import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for filtering and paginating categories.
 */
export const CATEGORIES_FILTER_CONFIG: PaginateConfig<CategoriesEntity> = {
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
     * Default sorting criteria.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of selected columns to retrieve.
     */
    select: [
        'id', 'title', 'description', 'image', 'status', 'author',
        'posts', 'createAt', 'updateAt'
    ],
    /**
     * Object specifying filterable columns and their supported operators.
     */
    filterableColumns: {
        id: true,
        title: [FilterOperator.ILIKE],
        description: [FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterSuffix.NOT],
        author: [FilterOperator.ILIKE],
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
     * Default limit for pagination.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    /**
     * Maximum limit for pagination.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    /**
     * Whether to include deleted categories in the results.
     */
    withDeleted: false,
    /**
     * Object specifying the relations to be loaded.
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
     * Whether to use relative path for pagination links.
     */
    relativePath: false,
};

/**
 * Configuration object for filtering and paginating categories with a specific status.
 */
export const CATEGORIES_FILTER_CONFIG_LOW: PaginateConfig<CategoriesEntity> = {
    /**
     * Inherit properties from CATEGORIES_FILTER_CONFIG.
     */
    ...CATEGORIES_FILTER_CONFIG,
    /**
     * Filter criteria to retrieve only published categories.
     */
    where: { status: PUBLISH_STATUS.PUBLISHED },
};