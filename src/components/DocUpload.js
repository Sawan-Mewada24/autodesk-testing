import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import axios from "axios";
import * as yup from "yup";
import MDBox from "./MDBox";
import MDInput from "./MDInput";
import MDButton from "./MDButton";

function DocUpload() {
  const [clientName, setClientName] = useState([]);
  const [projectId, setProjectId] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectfile, setProjectFile] = useState([]);

  console.log(projectId);
  useEffect(() => {
    axios.get("http://localhost:8088/api/clients-list").then((res) => {
      console.log(res.data.data);
      setClientName(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8088/api/projects-list/${clientId}`).then((resp) => {
      console.log(resp.data.data);
      setProjectData(resp.data.data);
    });
  }, [clientId]);
  useEffect(() => {
    const data = {
      client_id: clientId,
      project_id: projectId,
    };
    axios
      .post("http://localhost:8088/api/document-list", data)
      .then((response) => {
        console.log(response.data.data);
        setProjectFile(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }, [projectId]);

  const ValidationSchema = yup.object().shape({
    client_id: yup.string().required("Please Enter Client Name"),
    project_id: yup.string().required("Please Enter Project Name"),
    project_file: yup.string().required("Please Enter File"),
    title: yup.string().required("Please Enter Title"),
    file: yup
      .mixed()
      .test(
        "fileFormat",
        "Invalid file format",
        (value) => value && ["csv"].includes(value.name.split(".")[1])
      ),
  });
  return (
    <div>
      <DashboardLayout>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            client_id: "",
            project_id: "",
            project_file: "",
            title: "",
            file: null,
          }}
          onSubmit={(values) => {
            console.log(values, "values");
            // const Data = {
            //   myfile: values.file.name,
            //   title: values.title,
            //   client_id: values.client_id,
            //   project_id: values.project_id,
            //   document_id: values.project_file,
            // };

            const formData = new FormData();
            formData.append("myfile", values.file);
            formData.append("title", values.title);
            formData.append("client_id", values.client_id);
            formData.append("project_id", values.project_id);
            formData.append("document_id", values.project_file);
            console.log(formData);
            axios
              .post("http://localhost:8088/api/project-parts-add", formData)
              .then((resp) => {
                console.log(resp);
              })
              .catch((err) => {
                console.log(err.resp.data.message);
              });
          }}
        >
          {({ errors, handleBlur, setFieldValue, touched, values, handleChange, handleSubmit }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="client_id"
                  value={values.client_id}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setClientId(e.target.value);
                  }}
                  label="Client Name"
                >
                  {clientName.map((name) => (
                    <MenuItem value={`${name.id}`}>{name.client_name}</MenuItem>
                  ))}
                </Select>
                {errors.client_id && touched.client_id ? <div>{errors.client_id}</div> : null}
                &nbsp;&nbsp;
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">project name</InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={values.project_id}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setProjectId(e.target.value);
                    }}
                    name="project_id"
                    label="project_name"
                  >
                    {projectData.map((project) => (
                      <MenuItem value={`${project.id}`}>{project.project_name}</MenuItem>
                    ))}
                  </Select>
                  {errors.project_id && touched.project_id ? <div>{errors.project_id}</div> : null}
                </FormControl>
                &nbsp;&nbsp;
                <FormControl fullWidth>
                  <InputLabel>File</InputLabel>
                  <Select
                    id="demo-simple-select"
                    onBlur={handleBlur}
                    value={values.file_id}
                    onChange={handleChange}
                    name="project_file"
                    label="File"
                  >
                    {projectfile.map((file) => (
                      <MenuItem value={`${file.id}`}>{file.file_name}</MenuItem>
                    ))}
                  </Select>
                  {errors.project_file && touched.project_file ? (
                    <div>{errors.project_file}</div>
                  ) : null}
                </FormControl>
                &nbsp;&nbsp;
                <TextField
                  label="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                />
                {errors.title && touched.title ? <div>{errors.title}</div> : null}
                &nbsp;&nbsp;
                <MDBox mb={2}>
                  <MDInput
                    id="uploadFile"
                    type="file"
                    name="file"
                    onChange={(e) => setFieldValue("file", e.currentTarget.files[0])}
                    fullWidth
                    onBlur={handleBlur}
                  />
                  {errors.file && touched.file ? (
                    <Typography sx={{ fontSize: "13px", color: "red", marginTop: "2px" }}>
                      {errors.file}
                    </Typography>
                  ) : null}
                </MDBox>
                &nbsp;&nbsp;
                <MDButton variant="gradient" type="submit" color="info" fullWidth>
                  Submit
                </MDButton>
              </FormControl>
            </MDBox>
          )}
        </Formik>
      </DashboardLayout>
    </div>
  );
}

export default DocUpload;
