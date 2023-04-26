import { React, useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { Formik } from "formik";

import * as yup from "yup";
import MDButton from "./MDButton";
import MDBox from "./MDBox";
import MDInput from "./MDInput";

function FileUpload() {
  const [clientId, setClientId] = useState();
  const [clientName, setClientName] = useState([]);
  const [projectdata, setProjectdata] = useState([]);

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
  console.log(projectdata);
  console.log(clientId);

  const ValidationSchema = yup.object().shape({
    client_id: yup.string().required("Please Enter Client Name"),
    project_id: yup.string().required("Please Enter Project Name"),
    title: yup.string().required("Please Enter Title"),
    file: yup
      .mixed()
      .test(
        "fileFormat",
        "Invalid file format",
        (value) => value && ["nwd"].includes(value.name.split(".")[1])
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
            title: "",
            file: null,
          }}
          onSubmit={(values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("model-file", values.file);
            axios.post("http://localhost:8080/api/models", formData).then((res) => {
              console.log(res);
              if (res.status === 200) {
                const data = {
                  file_name: res.data.name,
                  urn: res.data.urn,
                  client_id: values.client_id,
                  project_id: values.project_id,
                };
                console.log(data);
                axios
                  .post("http://localhost:8088/api/documentadd", data)
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
                  });
              }
            });
          }}
        >
          {({
            values,
            errors,
            setFieldValue,
            touched,
            handleBlur,
            handleSubmit,
            handleReset,
            handleChange,
          }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="client_id"
                  value={values.client_id}
                  onChange={(e) => {
                    handleChange(e);
                    setClientId(e.target.value);
                  }}
                  onBlur={handleBlur}
                  label="Client Name"
                >
                  {clientName.map((data) => (
                    <MenuItem value={`${data.id}`}>{data.client_name}</MenuItem>
                  ))}
                </Select>
                {errors.client_id && touched.client_id ? <div>{errors.client_id}</div> : null}
                &nbsp;&nbsp;
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
                    {projectdata.map((data) => (
                      <MenuItem value={`${data.id}`}>{data.project_name}</MenuItem>
                    ))}
                  </Select>
                  {errors.project_id && touched.project_id ? <div>{errors.project_id}</div> : null}
                </FormControl>
                &nbsp;&nbsp;
                <TextField
                  label="title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                <MDButton
                  variant="gradient"
                  type="submit"
                  onReset={handleReset}
                  color="info"
                  fullWidth
                >
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

export default FileUpload;
