import { React, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import * as yup from "yup";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MDButton from "./MDButton";
import MDBox from "./MDBox";

function FileList() {
  const [clientName, setClientName] = useState([]);
  const [clientId, setClientId] = useState();
  const [projectData, setProjectdata] = useState([]);
  const [tablelist, setTableList] = useState([]);

  console.log(tablelist);

  useEffect(() => {
    axios.get("http://localhost:8088/api/clients-list").then((res) => {
      console.log(res.data.data);
      setClientName(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8088/api/projects-list/${clientId}`).then((resp) => {
      console.log(resp.data.data);
      setProjectdata(resp.data.data);
    });
  }, [clientId]);

  const ValidationSchema = yup.object().shape({
    client_id: yup.string().required("Please Choose Client Name"),
    project_id: yup.string().required("Please Choose Project Name"),
  });

  return (
    <div>
      <DashboardLayout>
        <h1>File List...</h1>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            client_id: "",
            project_id: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            const data = {
              client_id: values.client_id,
              project_id: values.project_id,
            };
            axios
              .post("http://localhost:8088/api/document-list", data)
              .then((response) => {
                console.log(response);
                setTableList(response.data.data);
              })
              .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
              });
            resetForm({ values: "" });
          }}
        >
          {({ values, errors, touched, handleBlur, handleReset, handleChange, handleSubmit }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="client_id"
                  value={values.client_id}
                  label="Client Name"
                  onChange={(e) => {
                    handleChange(e);
                    setClientId(e.target.value);
                  }}
                >
                  {clientName.map((data) => (
                    <MenuItem value={`${data.id}`}>{data.client_name}</MenuItem>
                  ))}
                </Select>
                {errors.client_id && touched.client_id ? <div>{errors.client_id}</div> : null}
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  project name
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  name="project_id"
                  value={values.project_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="project_name"
                >
                  {projectData.map((data) => (
                    <MenuItem value={`${data.id}`}>{data.project_name}</MenuItem>
                  ))}
                </Select>
                {errors.project_id && touched.project_id ? <div>{errors.project_id}</div> : null}
              </FormControl>
              &nbsp;&nbsp;
              <br />
              <br />
              <MDButton
                variant="gradient"
                type="submit"
                onReset={handleReset}
                color="info"
                fullWidth
              >
                Submit
              </MDButton>
              <Table className={Table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">File Name</TableCell>
                    <TableCell align="right">URN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablelist.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.file_name}</TableCell>
                      <TableCell align="left">{row.urn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </MDBox>
          )}
        </Formik>
      </DashboardLayout>
    </div>
  );
}

export default FileList;
