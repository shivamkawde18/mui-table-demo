"use client";

import { Context } from "@/app/layout";
import { getData } from "@/utils/data/data";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "..";

export const Home = () => {
  const [list, setList] = useState([]);
  const user = localStorage.getItem("user");
  console.log(user, "hiiii");
  const gettingData = async () => {
    if (user) {
      return await getData(user);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const data = await gettingData();
          setList(data.data);
        } catch (error) {
          alert("something went wrong");
        }
      };

      fetchData();
    }
  }, [user]);
  return (
    <div>
      <Table diamondData={list} />
    </div>
  );
};
