import { Controller, Get, Query } from '@nestjs/common';
import { WorkspaceService } from './services/workspace.service';
import { Workspace } from './workspace.entity';

@Controller('admin/workspaces')
export class AdminWorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  /**
   * Получить список workspaces с пагинацией и поиском
   * @param page номер страницы (по умолчанию 1)
   * @param limit количество на страницу (по умолчанию 20)
   * @param search строка поиска (по displayName или externalId)
   */
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
  ): Promise<{ items: Workspace[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.workspaceService['workspaceRepository'].createQueryBuilder('workspace');

    if (search) {
      queryBuilder.where('workspace.displayName ILIKE :search OR workspace.externalId ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [items, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();
    return { items, total, page, limit };
  }
}