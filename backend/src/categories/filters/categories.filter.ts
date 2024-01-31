import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const CATEGORIES_FILTER_CONFIG = {
    sortableColumns: [
        'id', 'title', 'status', 'author', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['createAt', 'DESC']],
    select: [
        'id', 'title', 'description', 'image', 'status', 'author',
        'posts', 'createAt', 'updateAt'
    ],
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
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    relations: {
        author: { posts: true },
        posts: { category: true }
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<CategoriesEntity>

export const CATEGORIES_FILTER_CONFIG_LOW = {
    ...CATEGORIES_FILTER_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<CategoriesEntity>