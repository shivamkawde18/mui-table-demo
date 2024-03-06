export const loginUser = async (username: string, password: string) => {
  const data = await fetch("https://mock.kgkit.net/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "kgk_user",
      password: "xKcD!",
    }),
  });

  const res = await data.json();
  return res;
};
