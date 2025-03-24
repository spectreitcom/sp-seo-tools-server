import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteKeywordCommand } from '../commands/delete-keyword.command';
import { KeywordRepository } from '../ports/keyword.repository';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(DeleteKeywordCommand)
export class DeleteKeywordCommandHandler
  implements ICommandHandler<DeleteKeywordCommand, void>
{
  constructor(private readonly keywordRepository: KeywordRepository) {}

  async execute(command: DeleteKeywordCommand): Promise<void> {
    const { userId, keywordId } = command;

    const isOwner = await this.keywordRepository.isOwnerOf(userId, keywordId);

    if (!isOwner) {
      throw new ForbiddenException();
    }

    await this.keywordRepository.delete(keywordId);
  }
}
