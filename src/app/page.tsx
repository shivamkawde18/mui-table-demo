"use client";

import { Login } from "@/components";
import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Context } from "./layout";
export default function Home() {
  const { isLogin } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/home");
    }
  }, [isLogin]);
  return (
    <main>
      <Login />
    </main>
  );
}
