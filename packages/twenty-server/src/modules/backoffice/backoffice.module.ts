import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

import { AuthModule } from 'src/engine/core-modules/auth/auth.module';
import { BackofficeApiKeyGuard } from './backoffice-api-key.guard';
import { BackofficeWorkspaceController } from './backoffice-workspace.controller';
import { BackofficeWorkspaceService } from './backoffice-workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace], 'core'), AuthModule],
  controllers: [BackofficeWorkspaceController],
  providers: [
    BackofficeApiKeyGuard, 
    BackofficeWorkspaceService
  ],
})
export class BackofficeModule {}
