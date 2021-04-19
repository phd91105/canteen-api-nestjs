import { AuthModule } from './auth/authentication/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './models/cart/cart.module';
import { CategoryModule } from './models/category/category.module';
import { FoodModule } from './models/food/food.module';
import { OrderModule } from './models/order/order.module';
import { OrderDetailModule } from './models/orderdetail/orderdetail.module';
import { MomoModule } from './models/payment/momo/momo.module';
import { VnpayModule } from './models/payment/vnpay/vnpay.module';
import { RoleModule } from './models/role/role.module';
import { UserModule } from './models/user/user.module';

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
