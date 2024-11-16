import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { JwtCustomModule } from '../jwt';


import { MailerCustomService } from '@mailer';

@Module({
  controllers: [AuthController],
  providers: [AuthService,MailerCustomService],
  imports: [
    forwardRef(()=>UserModule),
    forwardRef(()=>JwtCustomModule),
  ]
})
export class AuthModule {}
