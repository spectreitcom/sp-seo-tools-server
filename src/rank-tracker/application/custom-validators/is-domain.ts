import { registerDecorator, ValidationOptions } from 'class-validator';

export const isDomainValidator = (value: string) => {
  const regExp = new RegExp(/^([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/);
  return regExp.test(value);
};

export function IsDomain(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDomain',
      target: object.constructor,
      options: validationOptions,
      propertyName,
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return isDomainValidator(value);
        },
        defaultMessage(): string {
          return 'Invalid domain name';
        },
      },
    });
  };
}
