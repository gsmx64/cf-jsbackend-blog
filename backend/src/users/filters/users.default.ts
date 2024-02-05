import { PaginateConfig } from "nestjs-paginate";

import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


export const USERS_DEFAULT_CONFIG = {
    sortableColumns: ['updateAt'],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<UsersEntity>

export const USERS_DEFAULT_CONFIG_LOW = {
    ...USERS_DEFAULT_CONFIG,
    where: { status: USER_STATUS.ENABLED },
}  satisfies PaginateConfig<UsersEntity>