import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Basket} from "./entities/basket.entity";
import {Repository} from "typeorm";

@Injectable()
export class BasketsService {
  constructor(@InjectRepository(Basket) private readonly basketRepository: Repository<Basket>) {}

  create(createBasketDto: CreateBasketDto) {
    const basket = new Basket();
    basket.userId = createBasketDto.userId;
    return this.basketRepository.save(basket);
  }

  findAll() {
    return this.basketRepository.find();
  }

  findOne(id: number) {
    return this.basketRepository.findOne({ where: { id } })
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return this.basketRepository.delete({ id })
  }
}
