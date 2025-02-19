import { ESearchEngine } from '@prisma/client';

export class EngineKey {
  constructor(public readonly value: keyof typeof ESearchEngine) {}

  equals(engineKey: EngineKey) {
    return engineKey.value === this.value;
  }

  isValid() {
    return [
      ESearchEngine.GOOGLE,
      ESearchEngine.YANDEX,
      ESearchEngine.YAHOO,
    ].includes(this.value);
  }
}
