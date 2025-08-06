import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

import { AuthModule } from 'src/engine/core-modules/auth/auth.module';
import { FieldMetadataModule } from 'src/engine/metadata-modules/field-metadata/field-metadata.module';
import { ObjectMetadataModule } from 'src/engine/metadata-modules/object-metadata/object-metadata.module';
import { BackofficeApiKeyGuard } from './backoffice-api-key.guard';
import { BackofficeWorkspaceController } from './backoffice-workspace.controller';
import { BackofficeWorkspaceService } from './backoffice-workspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace], 'core'), AuthModule, ObjectMetadataModule, FieldMetadataModule],
  controllers: [BackofficeWorkspaceController],
  providers: [
    BackofficeApiKeyGuard, 
    BackofficeWorkspaceService
  ],
})
export class BackofficeModule {}
