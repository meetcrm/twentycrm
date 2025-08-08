import { CreateFieldInput } from 'src/engine/metadata-modules/field-metadata/dtos/create-field.input';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { FieldMetadataType } from 'twenty-shared/types';

type TemplateField = Omit<
  CreateFieldInput,
  'objectMetadataId' | 'workspaceId' | 'dataSourceId'
> & { relationTargetNameSingular?: string };

export interface TemplateObject {
  object: Omit<CreateObjectInput, 'dataSourceId' | 'workspaceId'>;
  fields: TemplateField[];
}

export const lawFirmTemplate: TemplateObject[] = [
  {
    object: {
      nameSingular: 'case',
      namePlural: 'cases',
      labelSingular: 'Дело',
      labelPlural: 'Дела',
      description: 'Юридические дела и проекты',
      icon: 'IconBriefcase2',
      shortcut: 'S',
    },
    fields: [
      { name: 'client', label: 'Клиент', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'person', relationCreationPayload: { 
        targetObjectMetadataId: '',
        targetFieldLabel: 'Клиент',
        targetFieldIcon: 'IconUser',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'title', label: 'Название дела', type: FieldMetadataType.TEXT },
      { name: 'status', label: 'Статус', type: FieldMetadataType.SELECT, options: [
        { value: 'in_progress', label: 'В работе', color: 'blue', position: 1 },
        { value: 'closed', label: 'Закрыто', color: 'green', position: 2 },
        { value: 'archived', label: 'Архив', color: 'gray', position: 3 },
      ] },
      { name: 'court', label: 'Суд', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'court', relationCreationPayload: { 
        targetObjectMetadataId: '',
        targetFieldLabel: 'Суд',
        targetFieldIcon: 'IconUser',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'lawyer', label: 'Ответственный юрист', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'person', relationCreationPayload: { 
        targetObjectMetadataId: '',
        targetFieldLabel: 'Ответственный юрист',
        targetFieldIcon: 'IconUser',
        type: RelationType.MANY_TO_ONE,
       } },
      { name: 'startDate', label: 'Дата начала', type: FieldMetadataType.DATE },
      { name: 'endDate', label: 'Дата окончания', type: FieldMetadataType.DATE },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'court',
      namePlural: 'courts',
      labelSingular: 'Суд',
      labelPlural: 'Суды',
      description: 'Суды, в которых ведутся дела',
      icon: 'IconScale',
      shortcut: 'T',
    },
    fields: [
      { name: 'name', label: 'Название суда', type: FieldMetadataType.TEXT },
      { name: 'address', label: 'Адрес', type: FieldMetadataType.TEXT },
      { name: 'contacts', label: 'Контакты', type: FieldMetadataType.TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'document',
      namePlural: 'documents',
      labelSingular: 'Документ',
      labelPlural: 'Документы',
      description: 'Документы по делам и клиентам',
      icon: 'IconFileCertificate',
      shortcut: 'D',
    },
    fields: [
      { name: 'case', label: 'Дело', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'case', relationCreationPayload: { 
        targetObjectMetadataId: '', 
        targetFieldLabel: 'Дело',
        targetFieldIcon: 'IconFolder',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'title', label: 'Название документа', type: FieldMetadataType.TEXT },
      { name: 'file', label: 'Файл', type: FieldMetadataType.RAW_JSON },
      { name: 'date', label: 'Дата', type: FieldMetadataType.DATE },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
];