"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Input } from "antd";

export const Table = ({ diamondData }: any) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [sortModel, setSortModel] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const handleSortModelChange = (newModel: any) => {
    setSortModel(newModel);
  };

  // Handle sorting logic for each column
  const sortedRows = React.useMemo(() => {
    let sortedData = [...diamondData];
    sortModel.forEach((sortItem) => {
      const { field, sort } = sortItem;
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string") {
          // Sorting logic for string values
          return sort === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          // Sorting logic for numeric values
          return sort === "asc" ? aValue - bValue : bValue - aValue;
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
      <div>
        <Input
          type="text"
          placeholder="Search by Lot ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginTop: 20, marginBottom: 20 }}
        />
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
