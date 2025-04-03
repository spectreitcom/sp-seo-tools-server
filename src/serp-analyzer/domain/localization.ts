export class Localization {
  constructor(
    private localizationId: string,
    private countryCode: string,
    private name: string,
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
