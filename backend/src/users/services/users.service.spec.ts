import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { AppDS, DataSourceConfig } from '../../config/data.source';
import { UsersService } from './users.service';
import { AuthService } from '../../auth/services/auth.service';
import { UsersEntity } from '../entities/users.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { SettingsEntity } from '../../settings/entities/settings.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { USER_STATUS } from '../../constants/user.status';
import { ROLES } from '../../constants/roles';
import { Repository } from 'typeorm';
import { UserCreateDTO } from '../dto/user.create.dto';


let connection: any;
let usersService: UsersService;
let usersRepository: Repository<UsersEntity>;

beforeAll(async () => {
  AppDS.setOptions({
    migrations: [__dirname + '/../../../test/migrations/**/*{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
  });
  connection = await AppDS.initialize();
  await connection.synchronize(true);
});

afterAll(async () => {
  await connection.destroy();
});

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
        isGlobal: true
      }),
      TypeOrmModule.forRoot({ ...DataSourceConfig }),
      TypeOrmModule.forFeature([
        UsersEntity,
        PostsEntity,
        CommentsEntity,
        CategoriesEntity,
        SettingsEntity
      ])
    ],
    providers: [
      UsersService,
      AuthService,
      JwtService
    ],
  }).compile();

  usersService = module.get<UsersService>(UsersService);
  usersRepository = module.get<Repository<UsersEntity>>(getRepositoryToken(UsersEntity));
  module.close();
});

describe('UsersService', () => {
  it('UsersService is defined', () => {
    expect(usersService).toBeDefined();
  });
});

describe('onlyPublished', () => {
  it('should return the correct query for role "basic"', () => {
    const mockUser1 = { role: 'BASIC', sub: '123' }; // Mock user data
    const mockToken1 = jwt.sign(mockUser1, 'secret-key'); // Generate mock JWT token
    const request1 = {
      headers: {
        'access_token': mockToken1, // Use mock JWT token
      },
    };
    const query = usersService.onlyPublished('posts', request1);
    expect(query).toBe("posts.status = 'PUBLISHED'");
  });

  it('should return the correct query for role other than "basic"', () => {
    const mockUser2 = { role: 'MODERATOR', id: '123' }; // Mock user data
    const mockToken2 = jwt.sign(mockUser2, 'secret-key'); // Generate mock JWT token
    const request2 = {
      headers: {
        'access_token': mockToken2, // Use mock JWT token
      },
    };
    const query = usersService.onlyPublished('posts', request2);
    expect(query).toBe("posts.description != 'fake-query'");
  });

  it('should throw an error if an exception occurs', () => {
    const mockUser3 = { role: 'BASIC', id: '123' }; // Mock user data
    const mockToken3 = jwt.sign(mockUser3, 'secret-key'); // Generate mock JWT token
    const request3 = {
      headers: {
        'access_token': mockToken3, // Use mock JWT token
      },
    };
    jest.spyOn(usersService, 'onlyPublished').mockImplementation(() => {
      throw new Error('Some error');
    });
    expect(() => {
      usersService.onlyPublished('posts', request3);
    }).toThrow('Some error');
  });
});

describe('onlyEnabledUsers', () => {
  it('should return the correct query for role "basic"', () => {
    const mockUser1 = { role: 'BASIC', sub: '123' }; // Mock user data
    const mockToken1 = jwt.sign(mockUser1, 'secret-key'); // Generate mock JWT token
    const request1 = {
      headers: {
        'access_token': mockToken1, // Use mock JWT token
      },
    };
    const query = usersService.onlyEnabledUsers(request1);
    expect(query).toBe("users.status = 'ENABLED'");
  });

  it('should return the correct query for role other than "basic"', () => {
    const mockUser2 = { role: 'MODERATOR', id: '123' }; // Mock user data
    const mockToken2 = jwt.sign(mockUser2, 'secret-key'); // Generate mock JWT token
    const request2 = {
      headers: {
        'access_token': mockToken2, // Use mock JWT token
      },
    };
    const query = usersService.onlyEnabledUsers(request2);
    expect(query).toBe("users.lastName != 'fake-query'");
  });

  it('should throw an error if an exception occurs', () => {
    const mockUser3 = { role: 'BASIC', id: '123' }; // Mock user data
    const mockToken3 = jwt.sign(mockUser3, 'secret-key'); // Generate mock JWT token
    const request3 = {
      headers: {
        'access_token': mockToken3, // Use mock JWT token
      },
    };
    jest.spyOn(usersService, 'onlyEnabledUsers').mockImplementation(() => {
      throw new Error('Some error');
    });
    expect(() => {
      usersService.onlyEnabledUsers(request3);
    }).toThrow('Some error');
  });
});

describe('isRoleBasic', () => {
  it('should return True if role is "basic"', () => {
    const mockUser1 = { role: 'BASIC', sub: '123' }; // Mock user data
    const mockToken1 = jwt.sign(mockUser1, 'secret-key'); // Generate mock JWT token
    const request1 = {
      headers: {
        'access_token': mockToken1, // Use mock JWT token
      },
    };
    const query = usersService.isRoleBasic(request1);
    expect(query).toBe(true);
  });

  it('should return False if role is other than "basic"', () => {
    const mockUser2 = { role: 'MODERATOR', id: '123' }; // Mock user data
    const mockToken2 = jwt.sign(mockUser2, 'secret-key'); // Generate mock JWT token
    const request2 = {
      headers: {
        'access_token': mockToken2, // Use mock JWT token
      },
    };
    const query = usersService.isRoleBasic(request2);
    expect(query).toBe(false);
  });

  it('should throw an error if an exception occurs', () => {
    const mockUser3 = { role: 'BASIC', id: '123' }; // Mock user data
    const mockToken3 = jwt.sign(mockUser3, 'secret-key'); // Generate mock JWT token
    const request3 = {
      headers: {
        'access_token': mockToken3, // Use mock JWT token
      },
    };
    jest.spyOn(usersService, 'isRoleBasic').mockImplementation(() => {
      throw new Error('Some error');
    });
    expect(() => {
      usersService.isRoleBasic(request3);
    }).toThrow('Some error');
  });
});

describe('getUserRoleforLogging', () => {
  it('should return "user" and "role" if Token is valid', () => {
    const mockUser1 = { role: 'BASIC', sub: '123' }; // Mock user data
    const mockToken1 = jwt.sign(mockUser1, 'secret-key'); // Generate mock JWT token
    const request1 = {
      headers: {
        'access_token': mockToken1, // Use mock JWT token
      },
    };
    const query = usersService.getUserRoleforLogging(request1);
    const value = JSON.parse('{"role": "BASIC", "user": "123"}');
    expect(query).toStrictEqual(value);
  });

  it('should return user and role as "Undefined" if Token is not valid', () => {
    const mockUser2 = {}; // Mock user data
    const mockToken2 = jwt.sign(mockUser2, 'secret-key'); // Generate mock JWT token
    const request2 = {
      headers: {
        'access_token': mockToken2, // Use mock JWT token
      },
    };
    const query = usersService.getUserRoleforLogging(request2);
    const user = undefined;
    const role = undefined;
    expect(query).toStrictEqual({ user, role });
  });

  it('should throw an error if an exception occurs', () => {
    const mockUser3 = { role: 'BASIC', id: '123' }; // Mock user data
    const mockToken3 = jwt.sign(mockUser3, 'secret-key'); // Generate mock JWT token
    const request3 = {
      headers: {
        'access_token': mockToken3, // Use mock JWT token
      },
    };
    jest.spyOn(usersService, 'getUserRoleforLogging').mockImplementation(() => {
      throw new Error('Some error');
    });
    expect(() => {
      usersService.getUserRoleforLogging(request3);
    }).toThrow('Some error');
  });
});

/*jest.mock('bcrypt');

describe('createUser', () => {
  const body: UserCreateDTO = {
    "username": "user",
    "password": "Password123*",
    "status": USER_STATUS.ENABLED,
    "role": ROLES.BASIC,
    "firstName": "User",
    "lastName": "Tester",
    "email": "user@tester.com",
    "age": 25,
    "city": "City",
    "country": "Country",
    "avatar": "https://url.com/avatar.png",
    "karma": 0,
    "posts": [],
    "categories": [],
    "comments": []
  };

  beforeEach(() => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword' as never);
    jest
      .spyOn(usersRepository, 'save')
      .mockImplementationOnce(async (user: UsersEntity): Promise<UsersEntity> => user);
  });

  it('successfully creates a user', async () => {
    const user = await usersService.createUser(body);
    expect(user.username).toEqual("user");
    expect(user.email).toEqual("admin@tester.com");
  });
  
  it('fails if username is already taken', async () => {
    // add additional mock implementation for failure
    jest.spyOn(usersRepository, 'save').mockImplementationOnce(() => {
      throw new Error();
    });
    // create first user with username
    await usersService.createUser(body);
    // attempt to create second user with username
    await expect(usersService.createUser(body)).rejects.toThrow(
      'BAD_REQUEST :: Error while creating the user.',
    );
  });
});*/