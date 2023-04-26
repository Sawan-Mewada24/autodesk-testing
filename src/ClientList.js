import { React, useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function ClientList() {
  const [tabledata, setTabledata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8088/api/clients-list").then((res) => {
      console.log(res.data.data);
      setTabledata(res.data.data);
    });
  }, []);
  return (
    <div>
      <DashboardLayout>
        <Table className={Table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Client Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.client_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardLayout>
    </div>
  );
}

export default ClientList;
