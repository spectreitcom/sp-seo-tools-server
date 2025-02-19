import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddSearchEngineCommand } from '../commands/add-search-engine.command';
import { SearchEngineRepository } from '../ports/search-engine.repository';
import { SearchEngineFactory } from '../../domain/factories/search-engine.factory';
import { BadRequestException } from '@nestjs/common';
import { EngineKey } from '../../domain/value-objects/engine-key';

@CommandHandler(AddSearchEngineCommand)
export class AddSearchEngineCommandHandler
  implements ICommandHandler<AddSearchEngineCommand, void>
{
  constructor(
    private readonly searchEngineRepository: SearchEngineRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddSearchEngineCommand): Promise<void> {
    const { searchEngineName, engineKey } = command;

    const _engineKey = new EngineKey(engineKey);

    if (!_engineKey.isValid()) {
      throw new BadRequestException('Invalid engine key');
    }

    const searchEngineExists =
      await this.searchEngineRepository.searchEngineExists(_engineKey.value);

    if (searchEngineExists) {
      throw new BadRequestException(
        `Search engine ${engineKey} already exists`,
      );
    }

    const searchEngine = SearchEngineFactory.create(
      searchEngineName,
      engineKey,
    );
    searchEngine.create();
    this.eventPublisher.mergeObjectContext(searchEngine);
    await this.searchEngineRepository.save(searchEngine);
    searchEngine.commit();
  }
}
