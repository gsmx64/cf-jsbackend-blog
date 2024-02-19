import { PaginateConfig } from "nestjs-paginate";

import { COMMENTS_FILTER_CONFIG } from "../../comments/filters/comments.filter";
import { CommentsEntity } from "../../comments/entities/comments.entity";


/**
 * Configuration object for searching comments.
 */
export const SEARCH_COMMENTS_CONFIG: PaginateConfig<CommentsEntity> = {
    ...COMMENTS_FILTER_CONFIG,
    searchableColumns: ['message'],
};