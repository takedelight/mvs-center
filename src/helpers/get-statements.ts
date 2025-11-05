import type { ApiResponse } from '@/types/statement.type';

export async function getStatements(limit: number): Promise<ApiResponse> {
    const response = await fetch(`http://localhost:3000/data?limit=${limit}`);

    return response.json();
}
