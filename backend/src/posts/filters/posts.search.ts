import { PaginateConfig } from "nestjs-paginate";

import { PostsEntity } from "../entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for searching posts.
 */
export const POSTS_SEARCH_CONFIG: PaginateConfig<PostsEntity> = {
  /**
   * List of sortable columns.
   */
  sortableColumns: [
    'id', 'title', 'status', 'author', 'category', 'createAt',
    'updateAt'
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
   * List of searchable columns.
   */
  searchableColumns: ['title', 'description', 'content'],
  /**
   * List of columns to select.
   */
  select: [
    'id', 'title', 'description', 'content', 'status', 'author',
    'category', 'createAt', 'updateAt'
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
   * Whether to include deleted posts in the search.
   */
  withDeleted: false,
  /**
   * Relations to include in the search.
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
   * Whether to use relative path for file uploads.
   */
  relativePath: false,
};

/**
 * Configuration object for searching published posts.
 */
export const POSTS_SEARCH_CONFIG_LOW: PaginateConfig<PostsEntity> = {
  /**
   * Inherit properties from POSTS_SEARCH_CONFIG.
   */
  ...POSTS_SEARCH_CONFIG,
  /**
   * Filter for published posts.
   */
  where: { status: PUBLISH_STATUS.PUBLISHED },
};