import { React, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from "axios";

function Projectlist() {
  const [tabledata, setTabledata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8088/api/projects-list/2").then((res) => {
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
              <TableCell align="right">Project Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.client_id}</TableCell>
                <TableCell align="left">{row.project_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardLayout>
    </div>
  );
}

export default Projectlist;
