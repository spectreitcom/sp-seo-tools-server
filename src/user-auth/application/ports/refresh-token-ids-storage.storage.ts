export abstract class RefreshTokenIdsStorageStorage {
  abstract insert(userId: string, tokenId: string): Promise<void>;
  abstract validate(userId: string, tokenId: string): Promise<boolean>;
  abstract invalidate(userId: string): Promise<void>;
}
