export const SORTED_BY = [
    { value: 'priority', alias: 'Пріоритет' },
    { value: 'status', alias: 'Статус' },
    { value: 'date', alias: 'Дата створення' },
];

export type SortedBy = (typeof SORTED_BY)[number];
