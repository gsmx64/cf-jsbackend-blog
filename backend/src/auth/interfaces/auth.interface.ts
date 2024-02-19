import { ROLES } from '../../constants/roles';
import { UsersEntity } from '../../users/entities/users.entity';


/**
 * Represents the payload of a token.
 */
export interface PayloadToken {
  sub: string;
  role: ROLES;
}

/**
 * Represents the body of an authentication request.
 */
export interface AuthBody {
  username: string;
  password: string;
}

/**
 * Represents the response of an authentication request.
 */
export interface AuthResponse {
  access_token: string;
  user: UsersEntity;
}

/**
 * Represents the result of decoding an authentication token.
 */
export interface AuthTokenResult {
  role: string;
  sub:  string;
  iat:  number;
  exp:  number;
}

/**
 * Represents the result of using an authentication token.
 */
export interface IUseToken {
  role: string;
  sub:  string;
  isExpired: boolean
}

/**
 * Represents the user role for logging purposes.
 */
export interface TypeUserRoleforLogging {
  user: string;
  role: string;
}