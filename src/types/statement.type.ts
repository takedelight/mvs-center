export type Statement = {
    id: number;
    name: string;
    type: string;
    priority: 'високий' | 'середній' | 'низький';
    createdAt: string;
    client: string;
};

export type Response = {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: Statement[];
};
