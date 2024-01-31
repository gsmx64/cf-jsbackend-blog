import { PaginateConfig } from "nestjs-paginate";

import { COMMENTS_SEARCH_CONFIG } from "../../comments/filters/comments.search";
import { CommentsEntity } from "../../comments/entities/comments.entity";


export const SEARCH_COMMENTS_CONFIG = {
    ...COMMENTS_SEARCH_CONFIG,

}  satisfies PaginateConfig<CommentsEntity>