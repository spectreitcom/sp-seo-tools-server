import { Module } from '@nestjs/common';
import { HtmlParserFacade } from './html-parser.facade';

@Module({
  imports: [],
  providers: [HtmlParserFacade],
  exports: [HtmlParserFacade],
})
export class HtmlParserModule {}
