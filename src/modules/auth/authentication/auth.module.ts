import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD:src/modules/auth/authentication/auth.module.ts
import { UserEntity } from 'src/modules/user/entities/user.entity';
=======
import { UserEntity } from 'src/modules/user/user.entity';
>>>>>>> 9b12b87 (update struct):src/auth/authentication/auth.module.ts
import AppConfiguration from 'src/config/app.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AppConfiguration.jwt.secret,
      signOptions: { expiresIn: AppConfiguration.jwt.expiration },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
