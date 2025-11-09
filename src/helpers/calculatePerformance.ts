import type { ApiResponse } from '@/pages/stats/StatsPage';

export const calcPerformance = (data: ApiResponse[]) => {
    if (!data.length) return [];

    const minTime = Math.min(...data.map((d) => d.time));

    return data
        .map((d) => ({
            method: d.method,
            efficiency: (minTime / d.time) * 100,
        }))
        .sort((a, b) => b.efficiency - a.efficiency);
};
