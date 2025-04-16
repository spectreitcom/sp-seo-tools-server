export class Localization {
  constructor(
    private readonly localizationId: string,
    private readonly countryCode: string,
    private readonly name: string,
  ) {}

  getLocalizationId() {
    return this.localizationId;
  }

  getCountryCode() {
    return this.countryCode;
  }

  getName() {
    return this.name;
  }
}
