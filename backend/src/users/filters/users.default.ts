import { PaginateConfig } from "nestjs-paginate";

import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Default configuration for users pagination.
 */
export const USERS_DEFAULT_CONFIG: PaginateConfig<UsersEntity> = {
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
 * Default configuration for users pagination with low status.
 */
export const USERS_DEFAULT_CONFIG_LOW: PaginateConfig<UsersEntity> = {
    ...USERS_DEFAULT_CONFIG,
    where: { status: USER_STATUS.ENABLED },
};