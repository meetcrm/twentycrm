import { CreateFieldInput } from 'src/engine/metadata-modules/field-metadata/dtos/create-field.input';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { FieldMetadataType } from 'twenty-shared/types';

export interface TemplateObject {
  object: Omit<CreateObjectInput, 'dataSourceId' | 'workspaceId'>;
  fields: Array<Omit<CreateFieldInput, 'objectMetadataId' | 'workspaceId' | 'dataSourceId'>>;
}

export const lawFirmTemplate: TemplateObject[] = [
  {
    object: {
      nameSingular: 'client',
      namePlural: 'clients',
      labelSingular: 'Клиент',
      labelPlural: 'Клиенты',
      description: 'Клиенты юридической компании',
      icon: '🧑‍💼',
      shortcut: 'C',
    },
    fields: [
      { name: 'name', label: 'Имя', type: FieldMetadataType.TEXT },
      { name: 'phone', label: 'Телефон', type: FieldMetadataType.PHONES },
      { name: 'email', label: 'Email', type: FieldMetadataType.EMAILS },
      { name: 'company', label: 'Компания', type: FieldMetadataType.TEXT },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'case',
      namePlural: 'cases',
      labelSingular: 'Дело',
      labelPlural: 'Дела',
      description: 'Юридические дела и проекты',
      icon: '📁',
      shortcut: 'S',
    },
    fields: [
      { name: 'client', label: 'Клиент', type: FieldMetadataType.RELATION, relationCreationPayload: { 
        targetObjectMetadataId: 'client',
        targetFieldLabel: 'Клиент',
        targetFieldIcon: '🧑‍💼',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'title', label: 'Название дела', type: FieldMetadataType.TEXT },
      { name: 'status', label: 'Статус', type: FieldMetadataType.SELECT, options: [
        { value: 'in_progress', label: 'В работе', color: 'blue', position: 1 },
        { value: 'closed', label: 'Закрыто', color: 'green', position: 2 },
        { value: 'archived', label: 'Архив', color: 'gray', position: 3 },
      ] },
      { name: 'court', label: 'Суд', type: FieldMetadataType.RELATION, relationCreationPayload: { 
        targetObjectMetadataId: 'court',
        targetFieldLabel: 'Суд',
        targetFieldIcon: '🧑‍💼',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'lawyer', label: 'Ответственный юрист', type: FieldMetadataType.RELATION, relationCreationPayload: { 
        targetObjectMetadataId: 'lawyer',
        targetFieldLabel: 'Ответственный юрист',
        targetFieldIcon: '🧑‍💼',
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
      icon: '⚖️',
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
      icon: '📄',
      shortcut: 'D',
    },
    fields: [
      { name: 'case', label: 'Дело', type: FieldMetadataType.RELATION, relationCreationPayload: { 
        targetObjectMetadataId: 'case', 
        targetFieldLabel: 'Дело',
        targetFieldIcon: '📁',
        type: RelationType.MANY_TO_ONE,
      } },
      { name: 'title', label: 'Название документа', type: FieldMetadataType.TEXT },
      { name: 'file', label: 'Файл', type: FieldMetadataType.RAW_JSON },
      { name: 'date', label: 'Дата', type: FieldMetadataType.DATE },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'lawyer',
      namePlural: 'lawyers',
      labelSingular: 'Юрист',
      labelPlural: 'Юристы',
      description: 'Сотрудники-юристы компании',
      icon: '👨‍⚖️',
      shortcut: 'L',
    },
    fields: [
      { name: 'name', label: 'Имя', type: FieldMetadataType.TEXT },
      { name: 'phone', label: 'Телефон', type: FieldMetadataType.PHONES },
      { name: 'email', label: 'Email', type: FieldMetadataType.EMAILS },
      { name: 'specialization', label: 'Специализация', type: FieldMetadataType.TEXT },
    ],
  },
];