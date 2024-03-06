import { Home } from "@/components";
import PrivateRoute from "@/components/Protected/Protected";
import React from "react";

const MyHome = () => {
  return (
    <main>
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    </main>
  );
};
export default MyHome;
