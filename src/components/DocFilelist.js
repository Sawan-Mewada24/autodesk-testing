import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Formik } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as yup from "yup";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "./MDButton";
import MDBox from "./MDBox";

function DocFilelist() {
  const [clientName, setClientName] = useState([]);
  const [clientId, setClientId] = useState();
  const [projectId, setProjectId] = useState();
  const [fileId, setFileId] = useState();
  const [projectName, setProjectName] = useState([]);
  const [projectfile, setProjectFile] = useState([]);
  const [doclist, setDocList] = useState([]);
  console.log(fileId);
  useEffect(() => {
    axios.get("http://localhost:8088/api/clients-list").then((res) => {
      console.log(res.data.data);
      setClientName(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8088/api/projects-list/${clientId}`).then((resp) => {
      setProjectName(resp.data.data);
      console.log(resp.data.data);
    });
  }, [clientId]);

  useEffect(() => {
    const data = {
      client_id: clientId,
      project_id: projectId,
    };
    axios.post("http://localhost:8088/api/document-list", data).then((response) => {
      console.log(response);
      setProjectFile(response.data.data);
    });
  }, [projectId]);

  const ValidationSchema = yup.object().shape({
    client_id: yup.string().required("Please Enter Client Name"),
    project_id: yup.string().required("Please Enter Project Name"),
    file_id: yup.string().required("Please Enter File "),
  });
  return (
    <div>
      <DashboardLayout>
        <h1>Document List...</h1>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            client_id: "",
            project_id: "",
            file_id: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            const Data = {
              client_id: values.client_id,
              project_id: values.project_id,
              file_id: values.file_id,
            };
            axios.post("http://localhost:8088/api/project-parts-filelist", Data).then((res) => {
              console.log(res);
              setDocList(res.data.data);
            });
          }}
        >
          {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="client_id"
                  onChange={(e) => {
                    handleChange(e);
                    setClientId(e.target.value);
                  }}
                  onBlur={handleBlur}
                  label="Client Name"
                >
                  {clientName.map((name) => (
                    <MenuItem value={`${name.id}`}>{name.client_name}</MenuItem>
                  ))}
                </Select>
                {errors.client_id && touched.client_id ? <div>{errors.client_id}</div> : null}
                &nbsp;
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                  <Select
                    id="demo-simple-select"
                    name="project_id"
                    onChange={(e) => {
                      handleChange(e);
                      setProjectId(e.target.value);
                    }}
                    onBlur={handleBlur}
                    label="Project Name"
                  >
                    {projectName.map((data) => (
                      <MenuItem value={`${data.id}`}>{data.project_name}</MenuItem>
                    ))}
                  </Select>
                  {errors.project_id && touched.project_id ? <div>{errors.project_id}</div> : null}
                </FormControl>
                &nbsp;
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">File Name</InputLabel>
                  <Select
                    id="demo-simple-select"
                    name="file_id"
                    onChange={(e) => {
                      handleChange(e);
                      setFileId(e.target.value);
                    }}
                    onBlur={handleBlur}
                    label="File Name"
                  >
                    {projectfile.map((data) => (
                      <MenuItem value={`${data.id}`}>{data.file_name}</MenuItem>
                    ))}
                  </Select>
                  {errors.file_id && touched.file_id ? <div>{errors.file_id}</div> : null}
                </FormControl>
                &nbsp;
                <MDButton variant="gradient" type="submit" color="info">
                  Submit
                </MDButton>
                <Table className={Table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">File Name</TableCell>
                      <TableCell align="right">Client ID</TableCell>
                      <TableCell align="right">Project ID</TableCell>
                      <TableCell align="right">Document ID</TableCell>
                      <TableCell align="right">Title</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doclist.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="left">{row.filename}</TableCell>
                        <TableCell align="left">{row.client_id}</TableCell>
                        <TableCell align="left">{row.project_id}</TableCell>
                        <TableCell align="left">{row.document_id}</TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FormControl>
            </MDBox>
          )}
        </Formik>
      </DashboardLayout>
    </div>
  );
}

export default DocFilelist;
