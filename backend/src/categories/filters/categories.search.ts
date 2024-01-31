import { PaginateConfig } from "nestjs-paginate";

import { CategoriesEntity } from "../entities/categories.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const CATEGORIES_SEARCH_CONFIG = {
    sortableColumns: [
        'id', 'title', 'status', 'author', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['createAt', 'DESC']],
    searchableColumns: ['title', 'description'],
    select: [
        'id', 'title', 'description', 'image', 'status', 'author',
        'posts', 'createAt', 'updateAt'
    ],
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

export const CATEGORIES_SEARCH_CONFIG_LOW = {
    ...CATEGORIES_SEARCH_CONFIG,
    where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<CategoriesEntity>