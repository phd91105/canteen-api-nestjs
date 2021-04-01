import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsController } from './product/product.controller';
import { ProductsService } from './product/product.service';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
