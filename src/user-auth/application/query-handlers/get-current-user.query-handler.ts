import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrentUserQuery } from '../queries/get-current-user.query';
import { UserRepository } from '../ports/user.repository';
import { UnauthorizedException } from '@nestjs/common';

export type GetCurrentUserQueryResponse = {
  email: string;
};

@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserQueryHandler
  implements IQueryHandler<GetCurrentUserQuery, GetCurrentUserQueryResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    query: GetCurrentUserQuery,
  ): Promise<GetCurrentUserQueryResponse> {
    const { userId } = query;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
    };
  }
}
