import { SetMetadata } from '@nestjs/common';

import { PUBLIC_KEY } from '../../constants/key.decorators';


/**
 * Marks a route or endpoint as publicly accessible.
 * This decorator can be used to allow unauthenticated access to a specific route or endpoint.
 */
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);