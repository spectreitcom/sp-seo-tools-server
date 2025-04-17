export class LocalizationReadModel {
  constructor(
    public readonly localizationId: string,
    public readonly countryCode: string,
    public readonly name: string,
  ) {}
}
