import type { SORT_KEYS } from '@/shared/constants';

export type SortOrder = 'asc' | 'desc';
export type SortKey = (typeof SORT_KEYS)[number];

