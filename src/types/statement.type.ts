export type Statement = {
    id: number;
    name: string;
    type: string;
    priority: 'високий' | 'середній' | 'низький';
    createdAt: string;
    duration: number;
    client: string;
};

export type Response = {
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    data: Statement[];
};
