import { PrismaService } from '@containerized/db';
import { Injectable } from '@nestjs/common';
import type { Registry } from '@prisma/client';
import { CreateRegistryDto, UpdateRegistryDto } from '../../dtos';

@Injectable()
export class RegistriesService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.registry.findMany();
  }

  findOneById(id: Registry['id']) {
    return this.prismaService.registry.findFirstOrThrow({ where: { id } });
  }

  create(createRegistryDto: CreateRegistryDto) {
    return this.prismaService.registry.create({ data: createRegistryDto });
  }

  update(id: number, updateRegistryDto: UpdateRegistryDto) {
    return this.prismaService.registry.update({ where: { id }, data: updateRegistryDto });
  }

  remove(id: Registry['id']) {
    return this.prismaService.registry.delete({ where: { id } });
  }
}
