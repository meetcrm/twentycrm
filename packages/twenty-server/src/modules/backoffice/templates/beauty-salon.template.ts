import { CreateFieldInput } from 'src/engine/metadata-modules/field-metadata/dtos/create-field.input';
import { RelationType } from 'src/engine/metadata-modules/field-metadata/interfaces/relation-type.interface';
import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { FieldMetadataType } from 'twenty-shared/types';

export interface TemplateObject {
  object: Omit<CreateObjectInput, 'dataSourceId' | 'workspaceId'>;
  fields: Array<Omit<CreateFieldInput, 'objectMetadataId' | 'workspaceId' | 'dataSourceId'>>;
}

export const beautySalonTemplate: TemplateObject[] = [
  {
    object: {
      nameSingular: 'client',
      namePlural: 'clients',
      labelSingular: 'Клиент',
      labelPlural: 'Клиенты',
      description: 'Посетители салона красоты',
      icon: 'IconUser',
      shortcut: 'C',
    },
    fields: [
      { name: 'name', label: 'Имя', type: FieldMetadataType.TEXT },
      { name: 'phone', label: 'Телефон', type: FieldMetadataType.PHONES },
      { name: 'email', label: 'Email', type: FieldMetadataType.EMAILS },
      { name: 'birthday', label: 'День рождения', type: FieldMetadataType.DATE },
      { name: 'notes', label: 'Заметки', type: FieldMetadataType.RICH_TEXT },
    ],
  },
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
      { name: 'client', label: 'Клиент', type: FieldMetadataType.RELATION, relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: '', targetFieldIcon: '', type: RelationType.MANY_TO_ONE } },
      { name: 'service', label: 'Услуга', type: FieldMetadataType.RELATION, relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: '', targetFieldIcon: '', type: RelationType.MANY_TO_ONE } },
      { name: 'employee', label: 'Мастер', type: FieldMetadataType.RELATION, relationCreationPayload: { targetObjectMetadataId: '', targetFieldLabel: '', targetFieldIcon: '', type: RelationType.MANY_TO_ONE } },
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
      nameSingular: 'employee',
      namePlural: 'employees',
      labelSingular: 'Сотрудник',
      labelPlural: 'Сотрудники',
      description: 'Мастера и персонал салона',
      icon: 'IconUserStar',
      shortcut: 'E',
    },
    fields: [
      { name: 'name', label: 'Имя', type: FieldMetadataType.TEXT },
      { name: 'phone', label: 'Телефон', type: FieldMetadataType.PHONES },
      { name: 'role', label: 'Должность', type: FieldMetadataType.SELECT, options: [
        { value: 'master', label: 'Мастер', color: 'blue', position: 1 },
        { value: 'admin', label: 'Администратор', color: 'green', position: 2 },
      ] },
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