import { PaginateConfig } from "nestjs-paginate";

import { USERS_FILTER_CONFIG } from "../../users/filters/users.filter";
import { UsersEntity } from "../../users/entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Configuration object for searching users.
 */
export const SEARCH_USERS_CONFIG: PaginateConfig<UsersEntity> = {
    ...USERS_FILTER_CONFIG,
    searchableColumns: [
        'username', 'email', 'firstName', 'lastName', 'age', 'city',
        'country'
    ],
};

/**
 * Configuration object for low roles for searching users.
 */
export const SEARCH_USERS_CONFIG_LOW: PaginateConfig<UsersEntity> = {
    ...SEARCH_USERS_CONFIG,
    where: { status: USER_STATUS.ENABLED },
};