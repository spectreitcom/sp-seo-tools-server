export class Localization {
  constructor(
    public readonly localizationId: string,
    public readonly domainParam: string,
    public readonly seLocalizationId: string,
    public readonly countryCode: string,
    public readonly name: string,
  ) {}
}
