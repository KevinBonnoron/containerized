import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEnvironmentDto } from '../../dtos';
import { EnvironmentEntity } from '../../entities';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectRepository(EnvironmentEntity) private readonly entityRepository: Repository<EnvironmentEntity>
  ) { }

  findAll() {
    return this.entityRepository.find();
  }

  findOneById(id: EnvironmentEntity['id']) {
    return this.entityRepository.findOneBy({ id });
  }

  create({ name, url }: CreateEnvironmentDto) {
    return this.entityRepository.save(this.entityRepository.create({ name, url }));
  }
}
