export const getData = async (token: string) => {
  const data = fetch("https://mock.kgkit.net/store/listAllStones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth: token,
    }),
  });

  const res = await (await data).json();
  return res;
};
