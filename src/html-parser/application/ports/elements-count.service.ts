export abstract class ElementsCountService {
  abstract h1ElementsCount(html: string): number;
  abstract h2ElementsCount(html: string): number;
  abstract h3ElementsCount(html: string): number;
  abstract h4ElementsCount(html: string): number;
  abstract h5ElementsCount(html: string): number;
  abstract h6ElementsCount(html: string): number;
  abstract pElementsCount(html: string): number;
  abstract strongElementsCount(html: string): number;
  abstract linkElementsCount(html: string): number;
  abstract linkNofollowElementsCount(html: string): number;
  abstract linkDofollowElementsCount(html: string): number;
  abstract imageElementsCount(html: string): number;
  abstract imageElementsWithAltCount(html: string): number;
  abstract imageElementsWithoutOrWithEmptyAltCount(html: string): number;
}
