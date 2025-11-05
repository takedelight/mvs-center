export type Priority = 'Високий' | 'Середній' | 'Низький';

export type Statement = {
    id: number;
    name: string;
    type: string;
    priority: Priority;
    createdAt: string;
    client: string;
};

export type ApiResponse = {
    total: number;
    data: Statement[];
};
