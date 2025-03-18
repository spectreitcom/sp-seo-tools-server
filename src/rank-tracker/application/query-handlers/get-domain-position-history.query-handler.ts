import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDomainPositionHistoryQuery } from '../queries/get-domain-position-history.query';
import { CollectionData } from '../../../shared/types/collection.data';
import { DomainPositionHistoryDto } from '../dto/domain-position-history.dto';
import { DomainPositionHistoryRepository } from '../ports/domain-position-history.repository';
import * as moment from 'moment';
import { BadRequestException } from '@nestjs/common';

export type GetKeywordPositionHistoryQueryResponse =
  CollectionData<DomainPositionHistoryDto>;

@QueryHandler(GetDomainPositionHistoryQuery)
export class GetDomainPositionHistoryQueryHandler
  implements
    IQueryHandler<
      GetDomainPositionHistoryQuery,
      GetKeywordPositionHistoryQueryResponse
    >
{
  constructor(
    private readonly domainPositionHistoryRepository: DomainPositionHistoryRepository,
  ) {}

  async execute(
    query: GetDomainPositionHistoryQuery,
  ): Promise<GetKeywordPositionHistoryQueryResponse> {
    const { keywordId, userId, page, take, toDate, fromDate } = query;

    const maxDateMoment = moment(moment().format('YYYY-MM-DD 23:59:59'));
    const minDateMoment = moment(
      maxDateMoment.clone().subtract(6, 'months').format('YYYY-MM-DD 00:00:00'),
    );

    let toDateMoment = moment(moment().format('YYYY-MM-DD 23:59:59'));

    let fromDateMoment = moment(
      toDateMoment.clone().subtract(6, 'months').format('YYYY-MM-DD 00:00:00'),
    );

    if (fromDate) {
      fromDateMoment = moment(`${fromDate} 00:00:00`);
    }

    if (toDate) {
      toDateMoment = moment(`${toDate} 23:59:59`);
    }

    console.log(toDateMoment.isAfter(fromDateMoment, 'day')); // todo;

    const isDateRangeOutOfRange =
      toDateMoment.isAfter(maxDateMoment, 'day') ||
      fromDateMoment.isBefore(minDateMoment, 'day') ||
      toDateMoment.isBefore(fromDateMoment, 'day');

    if (isDateRangeOutOfRange) {
      throw new BadRequestException('Wrong date range');
    }

    const toDateUnix = toDateMoment.unix();
    const fromDateUnix = fromDateMoment.unix();

    const skip = (page - 1) * take;

    const data = await this.domainPositionHistoryRepository.findAll(
      keywordId,
      userId,
      skip,
      take,
      fromDateUnix,
      toDateUnix,
    );

    const total =
      await this.domainPositionHistoryRepository.countAllWithSearchParams(
        keywordId,
        userId,
        fromDateUnix,
        toDateUnix,
      );

    const userTotal =
      await this.domainPositionHistoryRepository.countAllForUser(
        keywordId,
        userId,
      );

    return {
      data,
      total,
      userTotal,
    };
  }
}
