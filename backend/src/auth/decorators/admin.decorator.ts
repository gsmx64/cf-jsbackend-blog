import { SetMetadata } from '@nestjs/common';

import { ADMIN_KEY } from '../../constants/key.decorators';
import { ROLES } from '../../constants/roles';


/**
 * Decorator function that grants admin access to a specific resource or endpoint.
 */
export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);