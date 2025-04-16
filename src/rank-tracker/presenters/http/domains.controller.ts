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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDomainsListItemDto } from '../../application/swagger/user-domains-list-item.dto';
import { GetUserDomainsListQueryResponseSwagger } from '../../application/swagger/get-user-domains-list-query-response.swagger';
import { UserDomainsListQueryParamsDto } from '../../application/dto/user-domains-list-query-params.dto';

@Controller('rank-tracker/domains')
export class DomainsController {
  constructor(private readonly domainService: DomainService) {}

  @ApiBearerAuth('user-auth')
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

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: "Get a domain for the user's account",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserDomainsListQueryResponseSwagger,
  })
  @Get()
  @UseGuards(AuthGuard)
  getUserDomainsList(
    @Query() queryParams: UserDomainsListQueryParamsDto,
    @CurrentUserId() userId: string,
  ) {
    return this.domainService.getUserDomainsList(
      userId,
      queryParams.page,
      queryParams.searchText,
      queryParams.take,
    );
  }

  @ApiBearerAuth('user-auth')
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

  @ApiBearerAuth('user-auth')
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
