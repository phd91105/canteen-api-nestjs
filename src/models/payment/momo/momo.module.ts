import { MomoService } from './momo.service';
import { MomoController } from './momo.controller';
import { HttpModule, Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [MomoController],
  providers: [MomoService],
})
export class MomoModule {}
