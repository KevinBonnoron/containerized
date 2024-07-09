import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsDockerContainerVolume(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDockerContainerVolume',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value.destination !== undefined && value.mode !== undefined && value.propgation !== undefined && value.rw !== undefined && value.source !== undefined && value.type !== undefined;
        },
      },
    });
  };
}
