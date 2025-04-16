import { CreateSessionPortalCommandResponse as CreateSessionPortalCommandResponseBase } from '../command-handlers/create-session-portal.command-handler';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionPortalResponseSwagger
  implements CreateSessionPortalCommandResponseBase
{
  @ApiProperty()
  url: string;
}
