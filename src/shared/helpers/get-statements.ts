export async function getStatements(limit: number, method: string, sortderBy: string) {
    const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/data?limit=${limit}&method=${method}&sort_by=${sortderBy}`,
    );

    return response.json();
}
