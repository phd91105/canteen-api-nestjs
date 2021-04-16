import { VnpayModule } from './payment/vnpay/vnpay.module';
import { MomoModule } from './payment/momo/momo.module';
import { OrderDetailModule } from './orderdetail/orderdetail.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
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
