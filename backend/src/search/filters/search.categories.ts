import { PaginateConfig } from "nestjs-paginate";

import { CATEGORIES_FILTER_CONFIG } from "../../categories/filters/categories.filter";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const SEARCH_CATEGORIES_CONFIG = {
    ...CATEGORIES_FILTER_CONFIG,
    searchableColumns: ['title', 'description'],
}  satisfies PaginateConfig<CategoriesEntity>

export const SEARCH_CATEGORIES_CONFIG_LOW = {
    ...SEARCH_CATEGORIES_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<CategoriesEntity>