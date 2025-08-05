import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { BackofficeApiKeyGuard } from './backoffice-api-key.guard';
import { BackofficeWorkspaceService } from './backoffice-workspace.service';

@UseGuards(BackofficeApiKeyGuard)
@Controller('rest-backoffice/workspace')
export class BackofficeWorkspaceController {
  constructor(private readonly workspaceService: BackofficeWorkspaceService) {}

  @Post('create-by-external-id')
  async createByExternalId(
    @Body() body: { externalId: string; data?: Partial<Workspace> }
  ): Promise<Workspace> {
    return this.workspaceService.create({ externalId: body.externalId, ...body.data });
  }

  @Get('all')
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<{ items: Workspace[]; total: number; page: number; limit: number }> {
    return this.workspaceService.getAll(page, limit);
  }
}