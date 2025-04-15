export class UserAnalysisReadModel {
  constructor(
    public readonly analysisId: string,
    public readonly phrase: string,
    public readonly localizationName: string,
    public readonly localizationCountryCode: string,
    public readonly deviceName: string,
    public readonly progress: number,
  ) {}
}
