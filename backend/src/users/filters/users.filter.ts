import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";

import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


export const USERS_FILTER_CONFIG = {
    sortableColumns: [
        'id', 'username', 'email', 'status', 'role', 'firstName', 'lastName',
        'age', 'city', 'country', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['createAt', 'DESC']],
    select: [
        'id', 'username', 'email', 'status', 'rol', 'karma', 'avatar',
        'firstName', 'lastName', 'age', 'city', 'country', 'createAt',
        'updateAt'
    ],
    filterableColumns: {
        id: true,
        username: [FilterOperator.EQ, FilterOperator.ILIKE],
        email: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterSuffix.NOT],
        role: [FilterOperator.EQ, FilterSuffix.NOT],
        firstName: [FilterOperator.ILIKE],
        lastName: [FilterOperator.ILIKE],
        age: [
            FilterOperator.EQ,
            FilterOperator.BTW,
            FilterOperator.LT,
            FilterOperator.LTE,
            FilterOperator.GT,
            FilterOperator.GTE
        ],
        city: [FilterOperator.ILIKE],
        country: [FilterOperator.ILIKE],
        content: [FilterOperator.ILIKE],
        createAt: [
            FilterOperator.BTW,
            FilterOperator.LT,
            FilterOperator.LTE,
            FilterOperator.GT,
            FilterOperator.GTE
        ],
        updateAt: [
            FilterOperator.BTW,
            FilterOperator.LT,
            FilterOperator.LTE,
            FilterOperator.GT,
            FilterOperator.GTE
        ],
    },
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    relations: {
        posts: { author: true },
        comments: { author: true }
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<UsersEntity>

export const USERS_FILTER_CONFIG_LOW = {
    ...USERS_FILTER_CONFIG,
    where: { status: USER_STATUS.ENABLED },
}  satisfies PaginateConfig<UsersEntity>