import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AddDomainDto } from '../../application/dto/add-domain.dto';
import { DomainService } from '../../application/services/domain.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@Controller('rank-tracker/domains')
export class DomainsController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @UseGuards(AuthGuard)
  addDomain(@Body() payload: AddDomainDto, @CurrentUserId() userId: string) {
    return this.domainService.addDomain(payload, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUserDomainsList(
    @Query('page') page: number,
    @Query('searchText') searchText: string,
    @Query('take') take: string,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.getUserDomainsList(
      userId,
      page && page > 0 ? page : 1,
      searchText,
      +take ? +take : 30,
    );
  }

  @Get(':domainId')
  @UseGuards(AuthGuard)
  getUserDomain(
    @Param('domainId') domainId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.getUserDomain(domainId, userId);
  }

  @Delete(':domainId')
  @UseGuards(AuthGuard)
  deleteDomain(
    @Param('domainId') domainId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.deleteDomain(domainId, userId);
  }
}
