import { type PipeTransform, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { CreateCustomRegistryDto, CreateDockerHubRegistryDto, CreateGitlabRegistryDto, type CreateRegistryDto } from '../dtos';

export class CreateRegistryDtoPipe implements PipeTransform {
  async transform(value: CreateRegistryDto) {
    let transformed: CreateRegistryDto;

    switch (value.type) {
      case 'dockerhub':
        transformed = plainToInstance(CreateDockerHubRegistryDto, value);
        break;

      case 'gitlab':
        transformed = plainToInstance(CreateGitlabRegistryDto, value);
        break;

      case 'custom':
        transformed = plainToInstance(CreateCustomRegistryDto, value);
        break;

      default:
        // TODO
        throw new ValidationError();
    }

    const validation = await validate(transformed);
    if (validation.length > 0) {
      const validationPipe = new ValidationPipe();
      const exceptionFactory = validationPipe.createExceptionFactory();
      throw exceptionFactory(validation);
    }

    return transformed;
  }
}
