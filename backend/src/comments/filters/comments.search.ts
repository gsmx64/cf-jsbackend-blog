import { PaginateConfig } from "nestjs-paginate";

import { CommentsEntity } from "../entities/comments.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const COMMENTS_SEARCH_CONFIG = {
    sortableColumns: [
        'id', 'message', 'author', 'post', 'createAt', 'updateAt'
    ],
    nullSort: 'last',
    defaultSortBy: [['updateAt', 'DESC']],
    searchableColumns: ['message'],
    select: [
        'id', 'message', 'reaction', 'author', 'post',
        'createAt', 'updateAt'
    ],
    defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
    withDeleted: false,
    relations: {
        author: { comments: true },
        post: { comments: true }
    },
    loadEagerRelations: false,
    relativePath: false,
}  satisfies PaginateConfig<CommentsEntity>