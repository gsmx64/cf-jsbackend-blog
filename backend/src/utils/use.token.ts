import { AuthTokenResult, IUseToken } from '../auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;

    const currentDate = Math.floor(Date.now() / 1000);
    const expiresDate = Math.floor(decode.exp);
    
    // TODO: Verify this
    //console.log(`currentDate: ${new Date(currentDate * 1000)}`);
    //console.log(`expiresDate: ${new Date(expiresDate * 1000)}`);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
