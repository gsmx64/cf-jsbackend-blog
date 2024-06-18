/**
 * Service responsible for handling authentication operations.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthResponse, IUseToken, PayloadToken } from '../interfaces/auth.interface';
import { UsersService } from '../../users/services/users.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { AuthDTO } from '../dto/auth.dto';
import { LoggingMessages } from '../../utils/logging.messages';
import { useToken } from '../../utils/use.token';


@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UsersService,
      private readonly jwtService: JwtService
    ) {}

  /**
   * Validates a user's credentials.
   * @param username - The username or email of the user.
   * @param password - The password of the user.
   * @returns The user entity if the credentials are valid, otherwise null.
   */
  public async validateUser(
    username: string,
    password: string,
  ): Promise<UsersEntity | null> {
    const userByUsername = await this.userService.findLoginBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findLoginBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null;
  }

  /**
   * Signs a JSON Web Token (JWT) with the provided payload, secret, and expiration time.
   * @param payload - The payload of the JWT.
   * @param secret - The secret key used to sign the JWT.
   * @param expires - The expiration time of the JWT.
   * @returns The signed JWT.
   */
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  /**
   * Generates a JWT for the provided user.
   * @param user - The user entity.
   * @returns An object containing the access token and the user entity.
   */
  public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
    const getUser = await this.userService.findIdRoleOnly(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      access_token: this.signJWT({
        payload,
        secret: process.env.APP_AUTH_SECRET,
        expires: process.env.APP_AUTH_TOKEN_EXPIRATION,
      }),
      user,
    };
  }

  /**
   * Return current user role.
   * @param user - The user entity.
   * @returns An object containing the user role.
   */
  public async getUserRole(id: string): Promise<any> {
    const getUser = await this.userService.findIdRoleOnly(id);
  
    return getUser.role;
  }

  /**
   * Return current user role.
   * @param user - The user entity.
   * @returns An object containing the user role.
   */
  public async getUserId(request: any): Promise<any> {
    const currentToken = request.headers['access_token'];
      const manageToken: IUseToken | string = useToken(currentToken);
  
    return manageToken.sub;
  }

  /**
   * Logs in a user with the provided username and password.
   * @param username - The username or email of the user.
   * @param password - The password of the user.
   * @returns The generated JWT.
   * @throws UnauthorizedException if the credentials are not valid.
   */
  async login({ username, password }: AuthDTO) {
    const userValidate = await this.validateUser(
      username,
      password
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.generateJWT(userValidate);

    LoggingMessages.log(jwt, 'AuthService.login({ username, password }) -> jwt', jwt);
    return jwt;
  }
}
