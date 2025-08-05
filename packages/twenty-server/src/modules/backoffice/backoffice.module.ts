import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

import { BackofficeApiKeyGuard } from './backoffice-api-key.guard';
import { BackofficeWorkspaceService } from './backoffice-workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace], 'core')],
  controllers: [BackofficeWorkspaceService],
  providers: [BackofficeApiKeyGuard, BackofficeWorkspaceService],
})
export class BackofficeModule {}
