import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsDockerContainerPort(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDockerContainerPort',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value.container !== undefined && value.protocol !== undefined;
        },
      },
    });
  };
}
