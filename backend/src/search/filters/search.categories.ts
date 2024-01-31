import { PaginateConfig } from "nestjs-paginate";

import { CATEGORIES_SEARCH_CONFIG } from "../../categories/filters/categories.search";
import { CategoriesEntity } from "../../categories/entities/categories.entity";


export const SEARCH_CATEGORIES_CONFIG = {
    ...CATEGORIES_SEARCH_CONFIG,

}  satisfies PaginateConfig<CategoriesEntity>