"use client";
import { Context } from "@/app/layout";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const PrivateRoute = ({ children }:any) => {
  const router = useRouter();


  const user = localStorage.getItem("user");
  useEffect(() => {
    // cheking token
    let isAuthenticated = false;
    if (user) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      router.push("/");
    }
  }, []);

  return <>{user ? children : ""}</>;
};

export default PrivateRoute;
