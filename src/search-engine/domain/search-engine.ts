import { AggregateRoot } from '@nestjs/cqrs';
import { SearchEngineCreatedEvent } from './events/search-engine-created.event';
import { EngineKey } from './value-objects/engine-key';

export class SearchEngine extends AggregateRoot {
  constructor(
    public readonly searchEngineId: string,
    public readonly searchEngineName: string,
    public readonly engineKey: EngineKey,
  ) {
    super();
  }

  create() {
    this.apply(
      new SearchEngineCreatedEvent(
        this.searchEngineId,
        this.engineKey.value,
        this.searchEngineName,
      ),
    );
  }
}
