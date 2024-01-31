import { PaginateConfig } from "nestjs-paginate";

import { USERS_SEARCH_CONFIG } from "../../users/filters/users.search";
import { UsersEntity } from "../../users/entities/users.entity";


export const SEARCH_USERS_CONFIG = {
    ...USERS_SEARCH_CONFIG,

}  satisfies PaginateConfig<UsersEntity>