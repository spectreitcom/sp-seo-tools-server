export abstract class SeederService {
  abstract seed(userId: string): Promise<void>;
}
