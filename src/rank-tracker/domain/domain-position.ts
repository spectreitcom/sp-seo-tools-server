// todo: create factory

export class DomainPosition {
  constructor(
    public readonly domainPositionId: string,
    public readonly keywordId: string,
    public readonly position: number,
    public readonly timestamp: number,
  ) {}
}
