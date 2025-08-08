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

export const beautySalonTemplate: TemplateObject[] = [
  {
    object: {
      nameSingular: 'appointment',
      namePlural: 'appointments',
      labelSingular: 'Запись',
      labelPlural: 'Записи',
      description: 'Записи клиентов на услуги',
      icon: 'IconCalendar',
      shortcut: 'A',
    },
    fields: [
      { name: 'client', label: 'Клиент', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'person', relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: 'Клиент', targetFieldIcon: 'IconUser', type: RelationType.MANY_TO_ONE } },
      { name: 'service', label: 'Услуга', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'service', relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: 'Услуга', targetFieldIcon: 'IconScissors', type: RelationType.MANY_TO_ONE } },
      { name: 'employee', label: 'Мастер', type: FieldMetadataType.RELATION, relationTargetNameSingular: 'person', relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: 'Мастер', targetFieldIcon: 'IconUserStar', type: RelationType.MANY_TO_ONE } },
      { name: 'date', label: 'Дата', type: FieldMetadataType.DATE },
      { name: 'time', label: 'Время', type: FieldMetadataType.TEXT },
      { name: 'status', label: 'Статус', type: FieldMetadataType.SELECT, options: [
        { value: 'scheduled', label: 'Запланировано', color: 'blue', position: 1 },
        { value: 'completed', label: 'Выполнено', color: 'green', position: 2 },
        { value: 'cancelled', label: 'Отменено', color: 'gray', position: 3 },
      ] },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'service',
      namePlural: 'services',
      labelSingular: 'Услуга',
      labelPlural: 'Услуги',
      description: 'Услуги, предоставляемые салоном',
      icon: 'IconScissors',
      shortcut: 'S',
    },
    fields: [
      { name: 'name', label: 'Название', type: FieldMetadataType.TEXT },
      { name: 'price', label: 'Цена', type: FieldMetadataType.NUMBER },
      { name: 'duration', label: 'Длительность (мин)', type: FieldMetadataType.NUMBER },
      { name: 'description', label: 'Описание', type: FieldMetadataType.RICH_TEXT },
    ],
  },
  {
    object: {
      nameSingular: 'product',
      namePlural: 'products',
      labelSingular: 'Товар',
      labelPlural: 'Товары',
      description: 'Косметика и расходные материалы',
      icon: 'IconBottle',
      shortcut: 'P',
    },
    fields: [
      { name: 'name', label: 'Название', type: FieldMetadataType.TEXT },
      { name: 'quantity', label: 'Количество', type: FieldMetadataType.NUMBER },
      { name: 'price', label: 'Цена', type: FieldMetadataType.NUMBER },
      { name: 'supplier', label: 'Поставщик', type: FieldMetadataType.TEXT },
    ],
  },
];