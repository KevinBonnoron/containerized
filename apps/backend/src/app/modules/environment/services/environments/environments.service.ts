import { Injectable } from '@nestjs/common';

import { PrismaService } from '@containerized/db';
import { Environment } from '@prisma/client';
import type { CreateEnvironmentDto, UpdateEnvironmentDto } from '../../dtos';

@Injectable()
export class EnvironmentsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  findAll() {
    return this.prismaService.environment.findMany();
  }

  findOneById(id: Environment['id']) {
    return this.prismaService.environment.findFirstOrThrow({ where: { id } });
  }

  create({ name, url }: CreateEnvironmentDto) {
    return this.prismaService.environment.create({ data: { name, url } });
  }

  update(id: number, { name, url }: UpdateEnvironmentDto) {
    return this.prismaService.environment.update({ where: { id }, data: { name, url } });
  }

  remove(id: Environment['id']) {
    return this.prismaService.environment.delete({ where: { id } });
  }
}
