import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDomainCommand } from '../commands/delete-domain.command';
import { DomainRepository } from '../ports/domain.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteDomainCommand)
export class DeleteDomainCommandHandler
  implements ICommandHandler<DeleteDomainCommand, void>
{
  constructor(private readonly domainRepository: DomainRepository) {}

  async execute(command: DeleteDomainCommand): Promise<void> {
    const { domainId, userId } = command;

    const domain = await this.domainRepository.findById(domainId);

    if (!domain) {
      throw new NotFoundException('Domain not found');
    }

    if (domain.userId !== userId) {
      throw new BadRequestException('You dont have access to this resource');
    }

    await this.domainRepository.remove(domainId);
  }
}
