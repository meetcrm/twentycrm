import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SignInUpService } from 'src/engine/core-modules/auth/services/sign-in-up.service';
import { ExistingUserOrPartialUserWithPicture } from 'src/engine/core-modules/auth/types/signInUp.type';
import { User } from 'src/engine/core-modules/user/user.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { ObjectMetadataService } from 'src/engine/metadata-modules/object-metadata/object-metadata.service';
import { beautySalonTemplate } from 'src/modules/backoffice/templates/beauty-salon.template';
import { lawFirmTemplate } from 'src/modules/backoffice/templates/law-firm.template';

@Injectable()
export class BackofficeWorkspaceService {
  constructor(
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly signInUpService: SignInUpService,
    private readonly objectMetadataService: ObjectMetadataService,
  ) {}

  /**
   * Создаёт workspace с externalId и первого пользователя через production flow.
   */
  async create(data: {
    email: string;
    externalId: string;
    locale?: string;
  }): Promise<{ user: User; workspace: Workspace }> {
    if (!data.email) {
      throw new BadRequestException('email is required');
    }
    if (!data.externalId) {
      throw new BadRequestException('externalId is required');
    }

    // Production flow: создаём workspace и пользователя
    const userData: ExistingUserOrPartialUserWithPicture['userData'] = {
      type: 'newUserWithPicture',
      newUserWithPicture: {
        email: data.email,
        locale: data.locale || 'ru',
      },
    };
    const workspaceParams = {
      externalId: data.externalId,
    }
    const { user, workspace } = await this.signInUpService.signUpOnNewWorkspace(userData, workspaceParams);
    return { user, workspace };
  }

  async getAll(
    page = 1,
    limit = 20,
  ): Promise<{
    items: Workspace[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [items, total] = await this.workspaceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { items, total, page, limit };
  }

  async applyTemplate(workspaceId: string, template: string) {
    let objects;
    if (template === 'beauty_salon') {
      objects = beautySalonTemplate;
    } else if (template === 'law_firm') {
      objects = lawFirmTemplate;
    } else {
      throw new BadRequestException('Unknown template');
    }

    for (const obj of objects) {
      await this.objectMetadataService.createOne({
        ...obj,
        workspaceId,
        dataSourceId: 'default', // или актуальный id
      });
    }
    return { success: true };
  }
}
