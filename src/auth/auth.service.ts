import {
  BadRequestException, Injectable,
  Logger,
} from '@nestjs/common';
import { User, UsersService } from '@src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import { IAppEnv, IJWTEnv, IJWTOption } from '../common/config';


@Injectable()
export class AuthService {
  appHost: string;
  accessTokenConfig: IJWTOption;
  refreshTokenConfig: IJWTOption;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

  ) {
    const appConfig = this.configService.get<IAppEnv>('app')!;
    const jwtConfig = this.configService.get<IJWTEnv>('jwt')!;

    this.appHost = appConfig.host;
    this.accessTokenConfig = jwtConfig.accessToken;
    this.refreshTokenConfig = jwtConfig.refreshToken;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // NOTE : 회원 인증 로직

    // const passwordMatches = await argon2.verify(user.password, user.password);
    // if (!passwordMatches) throw new BadRequestException('Password is incorrect');

    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(user?: User) {
  //   if (user) {
  //     const payload = { username: user.username, sub: user.userId };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     }
  //   } 
  //   throw new Error('User not found');
  //
  // }

  /*
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.username);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }
  */

	async signIn(user?: User) {
    // Check if user exists
    if (!user) throw new BadRequestException('User does not exist');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

	async logout(_userId: number) {
    Logger.debug('Update user RefreshToken');
    return;
    // return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(_userId: number, _refreshToken: string) {
    // const hashedRefreshToken = await this.hashData(refreshToken);
    // await this.usersService.update(userId, {
    //   refreshToken: hashedRefreshToken,
    // });
    Logger.debug('Update user RefreshToken');
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.accessTokenConfig.secretOrPrivateKey,
          privateKey: this.accessTokenConfig.secretOrPrivateKey, // NOTE : PRIVATE KEY / SECRET KEY 선택적으로 적용 하기
          expiresIn: this.accessTokenConfig.signOptions.expiresIn,
          algorithm: this.accessTokenConfig.signOptions.algorithm as any,
          issuer: this.appHost,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.refreshTokenConfig.secretOrPrivateKey,
          privateKey: this.refreshTokenConfig.secretOrPrivateKey, // NOTE : PRIVATE KEY / SECRET KEY 선택적으로 적용 하기
          expiresIn: this.refreshTokenConfig.signOptions.expiresIn,
          algorithm: this.refreshTokenConfig.signOptions.algorithm as any,
          issuer: this.appHost,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
