import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

import { User } from '@microsoft/microsoft-graph-types';
import { BackofficeApiKeyGuard } from './backoffice-api-key.guard';
import { BackofficeWorkspaceService } from './backoffice-workspace.service';

@UseGuards(BackofficeApiKeyGuard)
@Controller('rest-backoffice/workspace')
export class BackofficeWorkspaceController {
  constructor(
    private readonly workspaceService: BackofficeWorkspaceService
  ) {}

  @Post('create-by-external-id')
  async createByExternalId(
    @Body() body: { externalId: string; email: string; locale?: string },
  ): Promise<{workspace: Workspace, user: User}> {
    
    return this.workspaceService.create({
      externalId: body.externalId,
      email: body.email,
      locale: body.locale,
    });
  }

  @Get('all')
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<{
    items: Workspace[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.workspaceService.getAll(page, limit);
  }

  @Post('apply-template')
  async applyTemplate(
    @Body() body: { workspaceId: string; template: "beauty_salon" | "law_firm" }
  ): Promise<{ success: boolean }> {
    return this.workspaceService.applyTemplate(body.workspaceId, body.template);
  }
}
