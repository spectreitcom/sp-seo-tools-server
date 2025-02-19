import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AddDomainDto } from '../../application/dto/add-domain.dto';
import { DomainService } from '../../application/services/domain.service';

@Controller('rank-tracker/domains')
export class DomainsController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  addDomain(@Body() payload: AddDomainDto) {
    return this.domainService.addDomain(payload, 'userId');
  }

  @Get()
  getUserDomainsList(
    @Query('page') page: number,
    @Query('searchText') searchText: string,
    userId: string, // todo;
  ) {
    return this.domainService.getUserDomainsList(
      userId,
      page && page > 0 ? page : 1,
      searchText,
    );
  }
}
