
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API_URL = 'https://www.googleapis.com/upload/drive/v3/files';

const getAccessToken = () => localStorage.getItem('google_access_token');

// Function to find a file by name
export async function findFile(fileName: string): Promise<string | null> {
    const accessToken = getAccessToken();
    if (!accessToken) return null;

    const query = `name='${fileName}' and trashed=false`;
    const response = await fetch(`${DRIVE_API_URL}/files?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (response.ok) {
        const data = await response.json();
        return data.files.length > 0 ? data.files[0].id : null;
    }
    return null;
}

// Function to create a new file
export async function createFile(fileName: string, content: object, mimeType: string = 'application/json'): Promise<any> {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('Not authenticated with Google');

    const metadata = {
        name: fileName,
        mimeType: mimeType,
        parents: ['appDataFolder'],
    };

    const multipartRequestBody = new Blob([
        new Blob([JSON.stringify(metadata)], { type: 'application/json' }),
        new Blob([JSON.stringify(content)], { type: mimeType }),
    ], { type: 'multipart/related' });


    const response = await fetch(`${DRIVE_UPLOAD_API_URL}?uploadType=multipart`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: multipartRequestBody,
    });

    return response.json();
}

// Function to get file content by ID
export async function getFileContent(fileId: string): Promise<any> {
    const accessToken = getAccessToken();
    if (!accessToken) return null;

    const response = await fetch(`${DRIVE_API_URL}/files/${fileId}?alt=media`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (response.ok) {
        return response.json();
    }
    return null;
}

// Function to update a file
export async function updateFile(fileId: string, content: object, mimeType: string = 'application/json'): Promise<any> {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('Not authenticated with Google');

    const response = await fetch(`${DRIVE_UPLOAD_API_URL}/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': mimeType,
        },
        body: JSON.stringify(content),
    });

    return response.json();
}
