import { AuthModule } from './modules/auth/authentication/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';
import { FoodModule } from './modules/food/food.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/orderdetail/orderdetail.module';
import { MomoModule } from './modules/payment/momo/momo.module';
import { VnpayModule } from './modules/payment/vnpay/vnpay.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    VnpayModule,
    MomoModule,
    OrderDetailModule,
    UserModule,
    FoodModule,
    RoleModule,
    CategoryModule,
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
