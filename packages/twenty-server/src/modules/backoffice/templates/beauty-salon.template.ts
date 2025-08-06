import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';

export const beautySalonTemplate: Omit<CreateObjectInput, 'dataSourceId' | 'workspaceId'>[] = [
  {
    nameSingular: 'client',
    namePlural: 'clients',
    labelSingular: 'Клиент',
    labelPlural: 'Клиенты',
    description: 'Посетители салона красоты',
    icon: '🧑‍🦰',
    shortcut: 'C',
  },
  {
    nameSingular: 'appointment',
    namePlural: 'appointments',
    labelSingular: 'Запись',
    labelPlural: 'Записи',
    description: 'Записи клиентов на услуги',
    icon: '📅',
    shortcut: 'A',
  },
  {
    nameSingular: 'service',
    namePlural: 'services',
    labelSingular: 'Услуга',
    labelPlural: 'Услуги',
    description: 'Услуги, предоставляемые салоном',
    icon: '💇‍♀️',
    shortcut: 'S',
  },
  {
    nameSingular: 'employee',
    namePlural: 'employees',
    labelSingular: 'Сотрудник',
    labelPlural: 'Сотрудники',
    description: 'Мастера и персонал салона',
    icon: '💁‍♀️',
    shortcut: 'E',
  },
  {
    nameSingular: 'product',
    namePlural: 'products',
    labelSingular: 'Товар',
    labelPlural: 'Товары',
    description: 'Косметика и расходные материалы',
    icon: '🧴',
    shortcut: 'P',
  },
];