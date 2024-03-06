export const getData = async (token: string) => {
  try {
    const data = await fetch("https://mock.kgkit.net/store/listAllStones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: token,
      }),
    });

    if (!data.ok) {
      throw new Error(`Failed to fetch data. Status: ${data.status}`);
    }

    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error?.message);
    throw new Error("Failed to fetch data");
  }
};
