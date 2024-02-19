import { PaginateConfig } from "nestjs-paginate";

import { CATEGORIES_FILTER_CONFIG } from "../../categories/filters/categories.filter";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Configuration object for searching categories.
 */
export const SEARCH_CATEGORIES_CONFIG: PaginateConfig<CategoriesEntity> = {
    ...CATEGORIES_FILTER_CONFIG,
    searchableColumns: ['title', 'description'],
};

/**
 * Configuration object for low roles for searching categories.
 */
export const SEARCH_CATEGORIES_CONFIG_LOW: PaginateConfig<CategoriesEntity> = {
    ...SEARCH_CATEGORIES_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
};