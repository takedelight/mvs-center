export async function getStatements(limit: number, method: string, sortderBy: string) {
    const response = await fetch(
        `http://localhost:3000/data?limit=${limit}&method=${method}&sort_by=${sortderBy}`,
    );

    return response.json();
}
