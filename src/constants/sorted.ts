export const SORTED_BY = [
    { value: 'priority', alias: 'Пріоритет' },
    { value: 'status', alias: 'Статус' },
    { value: 'createdAt', alias: 'Дата створення' },
];

export type SortedBy = (typeof SORTED_BY)[number];
