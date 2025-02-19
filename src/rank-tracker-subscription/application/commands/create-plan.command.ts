export class CreatePlanCommand {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly maxKeywordsQty: number,
  ) {}
}
