import { MomoService } from './momo.service';
import { MomoController } from './momo.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MomoController],
  providers: [MomoService],
})
export class MomoModule {}
