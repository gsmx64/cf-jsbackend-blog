import { PaginateConfig } from "nestjs-paginate";

import { CommentsEntity } from "../entities/comments.entity";


export const COMMENTS_DEFAULT_CONFIG = {
    sortableColumns: ['updateAt'],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<CommentsEntity>