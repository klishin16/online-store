import { Module } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Basket} from "./entities/basket.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  controllers: [BasketsController],
  providers: [BasketsService],
})
export class BasketsModule {}
