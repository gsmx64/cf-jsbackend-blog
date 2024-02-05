import { PaginateConfig } from "nestjs-paginate";

import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


export const USERS_SEARCH_CONFIG = {
    sortableColumns: [
        'id', 'username', 'email', 'status', 'role', 'firstName',
        'lastName', 'age', 'city', 'country', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    searchableColumns: [
        'username', 'email', 'firstName', 'lastName', 'age', 'city',
        'country'
    ],
    select: [
        'id', 'username', 'email', 'status', 'rol', 'karma', 'avatar',
        'firstName', 'lastName', 'age', 'city', 'country', 'createAt',
        'updateAt'
    ],
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

export const USERS_SEARCH_CONFIG_LOW = {
    ...USERS_SEARCH_CONFIG,
    where: { status: USER_STATUS.ENABLED },
}  satisfies PaginateConfig<UsersEntity>