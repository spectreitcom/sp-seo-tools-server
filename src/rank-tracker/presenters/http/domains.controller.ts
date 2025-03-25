import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Delete,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { AddDomainDto } from '../../application/dto/add-domain.dto';
import { DomainService } from '../../application/services/domain.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDomainsListItemDto } from '../../application/dto/swagger/user-domains-list-item.dto';
import { GetUserDomainsListQueryResponse } from '../../application/dto/swagger/get-user-domains-list-query-response';

@Controller('rank-tracker/domains')
export class DomainsController {
  constructor(private readonly domainService: DomainService) {}

  @ApiOperation({
    summary: "Creates a domain for the user's account",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The domain was created',
  })
  @Post()
  @UseGuards(AuthGuard)
  addDomain(@Body() payload: AddDomainDto, @CurrentUserId() userId: string) {
    return this.domainService.addDomain(payload, userId);
  }

  @ApiOperation({
    summary: "Get a domain for the user's account",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserDomainsListQueryResponse,
  })
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

  @ApiOperation({
    summary: "Get a domain for the user's account",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDomainsListItemDto,
  })
  @Get(':domainId')
  @UseGuards(AuthGuard)
  getUserDomain(
    @Param('domainId') domainId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.getUserDomain(domainId, userId);
  }

  @ApiOperation({
    summary:
      "Removes domain from the user's account and all associated keywords and history",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The domain was removed',
  })
  @Delete(':domainId')
  @UseGuards(AuthGuard)
  deleteDomain(
    @Param('domainId') domainId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.deleteDomain(domainId, userId);
  }
}
