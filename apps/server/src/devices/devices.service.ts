import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "./entities/device.entity";
import { Repository } from "typeorm";

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) {
  }
  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  findAll() {
    return this.deviceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
