export const loginUser = async (username: string, password: string) => {
  try {
    const data = await fetch("https://mock.kgkit.net/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!data.ok) {
      throw new Error(`Failed to log in. Status: ${data.status}`);
    }

    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error logging in:", error?.message);
    throw new Error("Failed to log in");
  }
};
