import { PaginateConfig } from "nestjs-paginate";

import { PostsEntity } from "../entities/posts.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export const POSTS_DEFAULT_CONFIG = {
  sortableColumns: ['updateAt'],
  nullSort: 'last',
  defaultSortBy: [['updateAt', 'DESC']],
  defaultLimit: process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
  maxLimit: process.env.APP_PAGINATION_MAX_LIMIT || 100,
  withDeleted: false,
  relations: {
    author: {},
    category: {},
    comments: {}
  },
  loadEagerRelations: false,
  relativePath: false,
}  satisfies PaginateConfig<PostsEntity>

export const POSTS_DEFAULT_CONFIG_LOW = {
  ...POSTS_DEFAULT_CONFIG,
  where: { status: PUBLISH_STATUS.PUBLISHED },
}  satisfies PaginateConfig<PostsEntity>