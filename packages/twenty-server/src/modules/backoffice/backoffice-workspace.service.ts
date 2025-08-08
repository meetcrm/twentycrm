import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SignInUpService } from 'src/engine/core-modules/auth/services/sign-in-up.service';
import { ExistingUserOrPartialUserWithPicture } from 'src/engine/core-modules/auth/types/signInUp.type';
import { User } from 'src/engine/core-modules/user/user.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { FieldMetadataService } from 'src/engine/metadata-modules/field-metadata/services/field-metadata.service';
import { ObjectMetadataService } from 'src/engine/metadata-modules/object-metadata/object-metadata.service';
import { beautySalonTemplate, TemplateObject } from 'src/modules/backoffice/templates/beauty-salon.template';
import { lawFirmTemplate } from 'src/modules/backoffice/templates/law-firm.template';
import { FieldMetadataType } from 'twenty-shared/types';

@Injectable()
export class BackofficeWorkspaceService {
  constructor(
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly signInUpService: SignInUpService,
    private readonly objectMetadataService: ObjectMetadataService,
    private readonly fieldMetadataService: FieldMetadataService,
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
    let objects: TemplateObject[];
    if (template === 'beauty_salon') {
      objects = beautySalonTemplate;
    } else if (template === 'law_firm') {
      objects = lawFirmTemplate;
    } else {
      throw new BadRequestException('Unknown template');
    }

    // Резолв стандартных объектов по имени (person/company)
    const personObject = await this.objectMetadataService.findOneWithinWorkspace(
      workspaceId,
      { where: { nameSingular: 'person' } },
    );
    const companyObject = await this.objectMetadataService.findOneWithinWorkspace(
      workspaceId,
      { where: { nameSingular: 'company' } },
    );

    const standardObjectIdByNameSingular: Record<string, string> = {};
    if (personObject?.id) standardObjectIdByNameSingular['person'] = personObject.id;
    if (companyObject?.id) standardObjectIdByNameSingular['company'] = companyObject.id;

    // 1) Сначала создаём все объекты, чтобы можно было ссылаться между собой
    const createdObjectIdByNameSingular: Record<string, string> = {};
    for (const obj of objects) {
      try {
        const created = await this.objectMetadataService.createOne({
          ...obj.object,
          workspaceId,
          dataSourceId: 'default',
        });
        createdObjectIdByNameSingular[obj.object.nameSingular] = created.id;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to create object', obj.object?.nameSingular, error);
      }
    }

    // 2) Затем создаём поля для каждого объекта
    for (const obj of objects) {
      const objectId = createdObjectIdByNameSingular[obj.object.nameSingular];
      if (!objectId) continue;

      for (const rawField of obj.fields as Array<
        (typeof obj.fields)[number] & { relationTargetNameSingular?: string }
      >) {
        try {
          const existing = await this.fieldMetadataService.findOneWithinWorkspace(
            workspaceId,
            {
              where: {
                objectMetadataId: objectId,
                name: rawField.name,
              },
            },
          );
          if (existing) {
            continue;
          }

          // Резолв цели связи по имени, если это relation-поле
          let fieldToCreate: any = { ...rawField };
          if (rawField.type === FieldMetadataType.RELATION) {
            const relationTargetName = (rawField as any).relationTargetNameSingular as
              | string
              | undefined;

            if (relationTargetName) {
              const targetId =
                standardObjectIdByNameSingular[relationTargetName] ??
                createdObjectIdByNameSingular[relationTargetName];
              if (!targetId) {
                throw new Error(
                  `Target object not found for relation: ${relationTargetName}`,
                );
              }
              const basePayload = (rawField as any).relationCreationPayload ?? {};
              fieldToCreate = {
                ...rawField,
                relationCreationPayload: {
                  ...basePayload,
                  targetObjectMetadataId: targetId,
                },
              };
            }
          }

          await this.fieldMetadataService.createOne({
            ...fieldToCreate,
            objectMetadataId: objectId,
            workspaceId,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(
            'Failed to create field',
            rawField?.name,
            'for object',
            obj.object?.nameSingular,
            error,
          );
        }
      }
    }

    return { success: true };
  }
}
