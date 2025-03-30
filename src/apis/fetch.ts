import { token } from "../share/share";

export async function getTheme()  {
    const response = await fetch('/api/ai/theme', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    },);
    const data = await response.json();
    // theme = data.message
    return data.data.theme;
}