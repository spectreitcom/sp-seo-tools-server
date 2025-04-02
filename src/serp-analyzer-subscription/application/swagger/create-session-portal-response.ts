import { CreateSessionPortalCommandResponse as CreateSessionPortalCommandResponseBase } from '../command-handlers/create-session-portal.command-handler';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionPortalResponse
  implements CreateSessionPortalCommandResponseBase
{
  @ApiProperty()
  url: string;
}
