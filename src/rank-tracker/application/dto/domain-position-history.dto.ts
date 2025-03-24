export class DomainPositionHistoryDto {
  constructor(
    public readonly domainPositionId: string,
    public readonly createdAt: string,
    public readonly position: number,
  ) {}
}
