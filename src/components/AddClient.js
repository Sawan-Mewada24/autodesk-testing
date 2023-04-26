import React from "react";
import axios from "axios";
// import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Formik } from "formik";
import * as yup from "yup";

// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDBox from "./MDBox";
import MDButton from "./MDButton";
import MDInput from "./MDInput";

// import MDTypography from "./MDTypography";

function AddClient() {
  const ValidationSchema = yup.object().shape({
    client_name: yup.string().required("Please Enter Client Name"),
  });
  return (
    <div>
      <DashboardLayout>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            client_name: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm({ values: "" });
            axios
              .post("http://localhost:8088/api/client-add", values)
              .then((res) => {
                console.log(res);
                alert(res.data.message);
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          }}
        >
          {({
            values,

            errors,
            touched,
            handleReset,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mt={1} mb={2}>
                <MDInput
                  type="text"
                  name="client_name"
                  value={values.client_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="client_name"
                  fullWidth
                />
                {errors.client_name && touched.client_name ? <div>{errors.client_name}</div> : null}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  type="submit"
                  onReset={handleReset}
                  color="info"
                  fullWidth
                >
                  Add
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </Formik>
      </DashboardLayout>
    </div>
  );
}
export default AddClient;
