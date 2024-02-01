import { PaginateConfig } from "nestjs-paginate";

import { COMMENTS_FILTER_CONFIG } from "../../comments/filters/comments.filter";
import { CommentsEntity } from "../../comments/entities/comments.entity";


export const SEARCH_COMMENTS_CONFIG = {
    ...COMMENTS_FILTER_CONFIG,
    searchableColumns: ['message'],
}  satisfies PaginateConfig<CommentsEntity>