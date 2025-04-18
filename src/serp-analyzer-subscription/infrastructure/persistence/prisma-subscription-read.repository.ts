import { Injectable } from '@nestjs/common';
import { SubscriptionReadRepository } from '../../application/ports/subscription-read.repository';
import { SubscriptionReadModel } from '../read-models/subscription.read-model';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class PrismaSubscriptionReadRepository
  implements SubscriptionReadRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<SubscriptionReadModel[]> {
    const models = await this.databaseService.saSubscription.findMany();
    return models.map(
      (model) =>
        new SubscriptionReadModel(
          model.id,
          model.name,
          model.amount,
          model.searchedPages,
          model.analysisPerMonth,
        ),
    );
  }

  async findByUser(userId: string): Promise<SubscriptionReadModel> {
    const model = await this.databaseService.saUserSubscription.findUnique({
      where: { userId },
      include: {
        subscription: true,
      },
    });
    if (!model) return null;
    return new SubscriptionReadModel(
      model.subscription.id,
      model.subscription.name,
      model.subscription.amount,
      model.subscription.searchedPages,
      model.subscription.analysisPerMonth,
    );
  }
}
