import { PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Default configuration for categories pagination.
 */
export const CATEGORIES_DEFAULT_CONFIG: PaginateConfig<CategoriesEntity> = {
  sortableColumns: ['updateAt'],
  nullSort: 'last',
  defaultSortBy: [['updateAt', 'DESC']],
  defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
  maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
  withDeleted: false,
  loadEagerRelations: false,
  relativePath: false,
};

/**
 * Default configuration for categories pagination with a filter for published status.
 */
export const CATEGORIES_DEFAULT_CONFIG_LOW: PaginateConfig<CategoriesEntity> = {
  ...CATEGORIES_DEFAULT_CONFIG,
  where: { status: PUBLISH_STATUS.PUBLISHED },
};