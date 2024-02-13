import { PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const CATEGORIES_DEFAULT_CONFIG = {
  sortableColumns: ['updateAt'],
  nullSort: 'last',
  defaultSortBy: [['updateAt', 'DESC']],
  defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
  maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
  withDeleted: false,
  loadEagerRelations: false,
  relativePath: false,
}  satisfies PaginateConfig<CategoriesEntity>

export const CATEGORIES_DEFAULT_CONFIG_LOW = {
  ...CATEGORIES_DEFAULT_CONFIG,
  where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<CategoriesEntity>