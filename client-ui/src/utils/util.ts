export function serverSideResponse(response) {
    if (!response.ok) {
        throw new Error("Failed to fetch data. Status: ");
    }
    return response.json();
}
