import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { PostsEntity } from "../entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for filtering and pagination of posts.
 */
export const POSTS_FILTER_CONFIG: PaginateConfig<PostsEntity> = {
  /**
   * List of sortable columns.
   */
  sortableColumns: [
    'id', 'title', 'status', 'author', 'category', 'createAt', 'updateAt'
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
   * List of columns to select.
   */
  select: [
    'id', 'title', 'description', 'status', 'content', 'author',
    'category', 'createAt', 'updateAt'
  ],
  /**
   * Object specifying filterable columns and their supported operators.
   */
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
  /**
   * Default limit for pagination.
   */
  defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
  /**
   * Maximum limit for pagination.
   */
  maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
  /**
   * Whether to include deleted posts in the results.
   */
  withDeleted: false,
  /**
   * Object specifying the relations to include in the query results.
   */
  relations: {
    author: {},
    category: {},
    comments: {}
  },
  /**
   * Whether to load eager relations.
   */
  loadEagerRelations: false,
  /**
   * Whether to use relative path for file names.
   */
  relativePath: false,
};

/**
 * Configuration object for filtering and pagination of published posts.
 */
export const POSTS_FILTER_CONFIG_LOW: PaginateConfig<PostsEntity> = {
  /**
   * Inherit properties from POSTS_FILTER_CONFIG.
   */
  ...POSTS_FILTER_CONFIG,
  /**
   * Filter criteria to only include published posts.
   */
  where: { status: PUBLISH_STATUS.PUBLISHED },
};