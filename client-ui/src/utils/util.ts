export function serverSideResponse(response: any) {
    // if (!response.ok) {
    //     console.error(response);
    // }
    return response.json();
}
