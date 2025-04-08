export abstract class HtmlService {
  abstract fromUrl(url: string): Promise<{ html: string; status: number }>;
}
