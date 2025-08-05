import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackofficeWorkspaceService {
  constructor(
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(data: Partial<Workspace>): Promise<Workspace> {
    if (!data.externalId) {
      throw new BadRequestException('externalId is required');
    }

    // Проверка уникальности externalId
    const existing = await this.workspaceRepository.findOne({
      where: { externalId: data.externalId },
    });
    if (existing) {
      throw new BadRequestException('Workspace with this externalId already exists');
    }

    const workspace = this.workspaceRepository.create(data);
    return this.workspaceRepository.save(workspace);
  }

  async getAll(page: number = 1, limit: number = 20): Promise<{ items: Workspace[]; total: number; page: number; limit: number }> {
  const [items, total] = await this.workspaceRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' },
  });
  return { items, total, page, limit };
}
}