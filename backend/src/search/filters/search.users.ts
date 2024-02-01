import { PaginateConfig } from "nestjs-paginate";

import { USERS_FILTER_CONFIG } from "../../users/filters/users.filter";
import { UsersEntity } from "../../users/entities/users.entity";


export const SEARCH_USERS_CONFIG = {
    ...USERS_FILTER_CONFIG,
    searchableColumns: [
        'username', 'email', 'firstName', 'lastName', 'age', 'city',
        'country'
    ],
}  satisfies PaginateConfig<UsersEntity>