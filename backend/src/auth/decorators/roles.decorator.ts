import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from '../../constants/key.decorators';
import { ROLES } from '../../constants/roles';


/**
 * Decorator that sets the metadata for the roles allowed to access a resource.
 * @param roles - An array of roles allowed to access the resource.
 * @returns A function that sets the metadata for the roles.
 */
export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);