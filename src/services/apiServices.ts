const BASE_URL = "https://mock.kgkit.net";

export const sendRequest = async (
  url: string,
  method: string,
  data: { username?: any; password?: any; auth?: any; token?: any },
  headers: Record<string, string> = {}
) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error.message);
    throw new Error("Failed to complete the request");
  }
};
