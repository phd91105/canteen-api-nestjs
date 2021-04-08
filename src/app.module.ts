import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ProductModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
