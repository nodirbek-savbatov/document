import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IResetPasswordRequest, ISignInRequest, ISignUpRequest } from './interfaces';
import { JwtCustomService } from '../jwt';
import { compare, hash } from 'bcrypt';
import { HASH_SALT } from '@constants';
import { MailerCustomService } from '@mailer';



@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtCustomService) private jwtCustomService: JwtCustomService,
    @Inject(MailerCustomService) private mailerService: MailerCustomService,
  ) { }

  async signUp(payload: ISignUpRequest) {
    const data = await this.userService.create(payload);
    const tokens = await this.jwtCustomService.generateTokens({
      userId: data.user.id,
      role: data.user.role,
    })

    return {
      user: data.user,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }

  async signIn(payload: ISignInRequest) {
    const user = await this.userService.findByEmail(payload.email)
    if (!user)
      throw new BadRequestException('email or password invalid')

    const isValid = await compare(payload.password, user.password)

    if (!isValid)
      throw new BadRequestException('email or password invalid')

    const tokens = await this.jwtCustomService.generateTokens({
      userId: user.id,
      role: user.role,
    })

    return {
      user,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }

  async googleAuth(req: any) {
    let user = await this.userService.findByEmail(req.user.email)
    let newUser = null

    if (!user) {
      newUser = await this.userService.create({
        email: req.user.email,
        password: req.user.googleId,
        full_name: req.user.displayName
      });
      user = newUser
    }

    const tokens = await this.jwtCustomService.generateTokens({
      userId: user.id,
      role: user.role,
    })


    return {
      user,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }



}



