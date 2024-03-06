"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
const orderMappings = {
  color: ["D", "E", "F", "G", "H", "I", "J"],
  shape: ["PS", "RD", "EM", "PR", "CU", "OV", "MQ", "HS", "RA", "AS", "TR"],
  clarity: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"],
  cut: ["EX", "VG", "GD", "FR"],
  polish: ["EX", "VG", "GD", "FR"],
  symmetry: ["EX", "VG", "GD", "FR"],
  fluorescence: ["NON", "FNT", "MED", "STG", "VSTG"],
  lab: ["GIA", "IGI", "HRD"],
  location: ["IND", "HK", "US", "EU", "SA"],
};

export const Table = ({ diamondData }: any) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [sortModel, setSortModel] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const handleSortModelChange = (newModel: any) => {
    setSortModel(newModel);
  };
  const router = useRouter();

  const customSortFunction = (column, aValue, bValue, sort) => {
    const order = orderMappings[column];
    if (order) {
      const aValueIndex = order.indexOf(aValue);
      const bValueIndex = order.indexOf(bValue);

      // If both values are in the order list, compare their indices
      if (aValueIndex !== -1 && bValueIndex !== -1) {
        return sort === "asc"
          ? aValueIndex - bValueIndex
          : bValueIndex - aValueIndex;
      }

      // If one value is not in the order list, prioritize the one that is
      if (aValueIndex === -1) return 1;
      if (bValueIndex === -1) return -1;
    }

    return 0;
  };

  const sortedRows = React.useMemo(() => {
    let sortedData = [...diamondData];
    sortModel.forEach((sortItem) => {
      const { field, sort } = sortItem;
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "number" || typeof bValue === "number") {
          // Sorting logic for numeric values
          return sort === "asc" ? aValue - bValue : bValue - aValue;
        } else if (orderMappings.hasOwnProperty(field)) {
          // Use custom sorting for specified columns
          return customSortFunction(field, aValue, bValue, sort);
        } else {
          // Sorting logic for other string values
          return sort === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      });
    });
    return sortedData;
  }, [diamondData, sortModel]);

  const columns = [
    {
      field: "certificate_number",
      headerName: "Certificate Number",
      width: 200,
    },
    { field: "carats", headerName: "Carats", width: 120 },
    { field: "clarity", headerName: "Clarity", width: 120 },
    { field: "color", headerName: "Color", width: 120 },
    { field: "cut", headerName: "Cut", width: 120 },
    { field: "fluorescence", headerName: "Fluorescence", width: 150 },
    { field: "lab", headerName: "Lab", width: 120 },
    { field: "lot_id", headerName: "Lot ID", width: 120 },
    { field: "polish", headerName: "Polish", width: 120 },
    { field: "price_per_carat", headerName: "Price per Carat", width: 150 },
    { field: "shape", headerName: "Shape", width: 120 },
    { field: "symmetry", headerName: "Symmetry", width: 120 },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 150,
      valueGetter: (params: any) =>
        params.row.price_per_carat * params.row.carats,
    },
  ];

  const filteredData = diamondData.filter((row: any) =>
    row.lot_id.toString().includes(searchText)
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          type="text"
          placeholder="Search by Lot ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginTop: 20, marginBottom: 20, height: 45 }}
        />
        <div>
          <h3>{localStorage.getItem("name")}</h3>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("name");
              router.push("/");
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
          >
            Logout
          </Button>
        </div>
      </div>
      <DataGrid
        pagination={false}
        rows={filteredData}
        columns={columns}
        pageSize={diamondData.length}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelection: any) =>
          setSelectionModel(newSelection)
        }
        selectionModel={selectionModel}
        sortModel={[{ field: "certificate_number", sort: "asc" }]}
        getRowId={(row) => row.lot_id}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </div>
  );
};
