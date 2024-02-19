import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate";
import { UsersEntity } from "../entities/users.entity";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Configuration object for filtering and paginating users.
 */
export const USERS_FILTER_CONFIG: PaginateConfig<UsersEntity> = {
    /**
     * List of sortable columns.
     */
    sortableColumns: [
        'id', 'username', 'email', 'status', 'role', 'firstName', 'lastName',
        'age', 'city', 'country', 'createAt', 'updateAt'
    ],
    /**
     * Sort order for null values.
     */
    nullSort: 'last',
    /**
     * Default sorting criteria.
     */
    defaultSortBy: [['updateAt', 'DESC']],
    /**
     * List of columns to select.
     */
    select: [
        'id', 'username', 'email', 'status', 'rol', 'karma', 'avatar',
        'firstName', 'lastName', 'age', 'city', 'country', 'createAt',
        'updateAt'
    ],
    /**
     * Object defining filterable columns and their supported filter operators.
     */
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
    /**
     * Default limit for pagination.
     */
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    /**
     * Maximum limit for pagination.
     */
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    /**
     * Whether to include deleted entities in the result.
     */
    withDeleted: false,
    /**
     * Relations to include in the result.
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
     * Whether to use relative path for pagination links.
     */
    relativePath: false,
};

/**
 * Configuration object for filtering and paginating users with a specific status.
 */
export const USERS_FILTER_CONFIG_LOW: PaginateConfig<UsersEntity> = {
    ...USERS_FILTER_CONFIG,
    /**
     * Filter condition to only include users with the specified status.
     */
    where: { status: USER_STATUS.ENABLED },
};