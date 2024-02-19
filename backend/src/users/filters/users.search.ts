import { PaginateConfig } from "nestjs-paginate";

import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Configuration object for searching users.
 */
export const USERS_SEARCH_CONFIG: PaginateConfig<UsersEntity> = {
    /**
     * List of sortable columns.
     */
    sortableColumns: [
        'id', 'username', 'email', 'status', 'role', 'firstName',
        'lastName', 'age', 'city', 'country', 'createAt', 'updateAt'
    ],
    /**
     * Sort order for null values.
     */
    //nullSort: 'last',
    /**
     * Default sorting criteria.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of searchable columns.
     */
    searchableColumns: [
        'username', 'email', 'firstName', 'lastName', 'age', 'city',
        'country'
    ],
    /**
     * List of columns to select.
     */
    select: [
        'id', 'username', 'email', 'status', 'rol', 'karma', 'avatar',
        'firstName', 'lastName', 'age', 'city', 'country', 'createAt',
        'updateAt'
    ],
    /**
     * Default limit for pagination.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    /**
     * Maximum limit for pagination.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    /**
     * Whether to include deleted users in the search.
     */
    withDeleted: false,
    /**
     * Relations to include in the search.
     */
    relations: {
        posts: { author: true },
        comments: { author: true }
    },
    /**
     * Whether to load eager relations.
     */
    loadEagerRelations: false,
    /**
     * Whether to use relative path.
     */
    relativePath: false,
};

/**
 * Configuration object for searching enabled users.
 */
export const USERS_SEARCH_CONFIG_LOW: PaginateConfig<UsersEntity> = {
    /**
     * Inherits properties from USERS_SEARCH_CONFIG.
     */
    ...USERS_SEARCH_CONFIG,
    /**
     * Filter for enabled users.
     */
    where: { status: USER_STATUS.ENABLED },
};