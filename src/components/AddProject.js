import { React, useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import * as yup from "yup";
import MDButton from "./MDButton";
import MDBox from "./MDBox";

function AddProject() {
  const [tabledata, setTabledata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8088/api/clients-list").then((res) => {
      console.log(res.data.data);
      setTabledata(res.data.data);
    });
  }, []);
  const ValidationSchema = yup.object().shape({
    client_id: yup.string().required("Please Enter Client Name"),
    project_name: yup.string().required("Please Enter Project Name"),
  });
  return (
    <div>
      <DashboardLayout>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            client_id: "",
            project_name: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            axios
              .post("http://localhost:8088/api/project-add", values)
              .then((res) => {
                console.log(res);
                alert(res.data.message);
                if (res.data.status === 200 || res.data.status === 400) {
                  resetForm({ values: "" });
                }
              })
              .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
              });
          }}
        >
          {({ values, errors, touched, handleBlur, handleSubmit, handleReset, handleChange }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
                <Select
                  id="demo-simple-select"
                  name="client_id"
                  value={values.client_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Client Name"
                >
                  {tabledata.map((data) => (
                    <MenuItem value={`${data.id}`}>{data.client_name}</MenuItem>
                  ))}
                </Select>
                {errors.client_id && touched.client_id ? <div>{errors.client_id}</div> : null}
                &nbsp;&nbsp;
                <TextField
                  label="project_name"
                  name="project_name"
                  value={values.project_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.project_name && touched.project_name ? (
                  <div>{errors.project_name}</div>
                ) : null}
                &nbsp;&nbsp;
                <MDButton
                  variant="gradient"
                  type="submit"
                  onReset={handleReset}
                  color="info"
                  fullWidth
                >
                  Add
                </MDButton>
              </FormControl>
            </MDBox>
          )}
        </Formik>
      </DashboardLayout>
    </div>
  );
}

export default AddProject;
