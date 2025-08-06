import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';

export const lawFirmTemplate: Omit<CreateObjectInput, 'dataSourceId' | 'workspaceId'>[] = [
  {
    nameSingular: 'client',
    namePlural: 'clients',
    labelSingular: 'Клиент',
    labelPlural: 'Клиенты',
    description: 'Клиенты юридической компании',
    icon: '🧑‍💼',
    shortcut: 'C',
  },
  {
    nameSingular: 'case',
    namePlural: 'cases',
    labelSingular: 'Дело',
    labelPlural: 'Дела',
    description: 'Юридические дела и проекты',
    icon: '📁',
    shortcut: 'S',
  },
  {
    nameSingular: 'court',
    namePlural: 'courts',
    labelSingular: 'Суд',
    labelPlural: 'Суды',
    description: 'Суды, в которых ведутся дела',
    icon: '⚖️',
    shortcut: 'T',
  },
  {
    nameSingular: 'document',
    namePlural: 'documents',
    labelSingular: 'Документ',
    labelPlural: 'Документы',
    description: 'Документы по делам и клиентам',
    icon: '📄',
    shortcut: 'D',
  },
  {
    nameSingular: 'lawyer',
    namePlural: 'lawyers',
    labelSingular: 'Юрист',
    labelPlural: 'Юристы',
    description: 'Сотрудники-юристы компании',
    icon: '👨‍⚖️',
    shortcut: 'L',
  },
];