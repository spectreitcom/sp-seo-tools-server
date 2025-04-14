import { Module } from '@nestjs/common';
import { HtmlParserFacade } from './html-parser.facade';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [HtmlParserFacade],
  exports: [HtmlParserFacade],
})
export class HtmlParserModule {}
