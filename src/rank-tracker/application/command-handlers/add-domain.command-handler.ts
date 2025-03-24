import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddDomainCommand } from '../commands/add-domain.command';
import { DomainRepository } from '../ports/domain.repository';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DomainFactory } from '../../domain/factories/domain.factory';

@CommandHandler(AddDomainCommand)
export class AddDomainCommandHandler
  implements ICommandHandler<AddDomainCommand, void>
{
  constructor(private readonly domainRepository: DomainRepository) {}

  async execute(command: AddDomainCommand): Promise<void> {
    const { text, userId } = command;

    const domainExists = await this.domainRepository.domainExists(text, userId);

    if (domainExists) {
      throw new BadRequestException(`Domain ${text} already exists`);
    }

    try {
      const page = DomainFactory.create(text, userId);
      await this.domainRepository.save(page);
    } catch (_) {
      throw new InternalServerErrorException();
    }
  }
}
