"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { sortingOrderHandler } from "@/utils/sort";
import { Button, Input } from "antd";
import { getData } from "@/services/data";

export const Home = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = React.useState("");
  const user = localStorage.getItem("user");
  console.log(list);
  const gettingData = async () => {
    if (user) {
      return await getData(user);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const data = await gettingData();
          setList(data.data);
          setLoading(false);
        } catch (error) {
          alert("something went wrong");
        }
      };

      fetchData();
    }
  }, [user]);

  const columns = useMemo<MRT_ColumnDef<Diamond>[]>(
    () => [
      {
        accessorKey: "certificate_number",
        header: "certificate_number",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "lot_id",
        header: "Lot_ID",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "color",
        header: "Color",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "shape",
        header: "Shape",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "clarity",
        header: "Clarity",
        size: 200,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "cut",
        header: "Cut",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "polish",
        header: "Polish",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "symmetry",
        header: "Symmetry",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "fluorescence",
        header: "Fluorescence",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "lab",
        accessorFn: (row) => (row.lab ? row.lab : "-"),
        header: "Lab",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "location",
        accessorFn: (row) => (row.location ? row.location : "-"),
        header: "Location",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "carats",
        header: "Carats",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "price_per_carat",
        header: "Price per Carat",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "total_price",
        accessorFn: (row) =>
          parseFloat((row.carats * row.price_per_carat).toFixed(2)),
        header: "Total Price",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "certificate_number",
        accessorFn: (row) =>
          row.certificate_number ? row.certificate_number : "-",
        header: "Certificate Number",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );
  const filteredData = list.filter((row: any) =>
    row.lot_id.toString().includes(searchText)
  );
  const table = useMaterialReactTable({
    columns,
    data: filteredData.length > 0 ? filteredData : list,
    state: {
      isLoading: loading,
    },
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableRowSelection: true,
  });

  return (
    <div>
      <div className="home-container">
        <Input
          type="text"
          placeholder="Search by Lot ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <div>
          <h3>{localStorage.getItem("name")}</h3>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("name");
              router.push("/");
            }}
            className="logout-btn"
          >
            Logout
          </Button>
        </div>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};
