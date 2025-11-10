import type { Statement } from './statement.type';

export type ApiResponse = {
    key: string;
    time: string;
    method: string;
    sortBy: string;
    length: number;
    statements: Statement[];
    comparisions: string;
};
