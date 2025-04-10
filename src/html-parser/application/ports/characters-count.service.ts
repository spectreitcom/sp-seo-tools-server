export abstract class CharactersCountService {
  abstract h1CharactersCount(html: string): number;
  abstract h2CharactersCount(html: string): number;
  abstract h3CharactersCount(html: string): number;
  abstract h4CharactersCount(html: string): number;
  abstract h5CharactersCount(html: string): number;
  abstract h6CharactersCount(html: string): number;
  abstract pCharactersCount(html: string): number;
  abstract strongCharactersCount(html: string): number;
  abstract imgAltCharactersCount(html: string): number;
  abstract titleCharactersCount(html: string): number;
  abstract metaDescriptionCharactersCount(html: string): number;
  abstract bodyCharactersCount(html: string): number;
}
