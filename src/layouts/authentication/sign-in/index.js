/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";

// react-router-dom components
// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

// import * as yup from 'yup'
import * as yup from "yup";
// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";

// @mui icons
import { useDispatch } from "react-redux";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import { login } from "Slice";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValue = {
    email: "",
    password: "",
  };
  const ValidationSchema = yup.object().shape({
    email: yup.string().required("please enter your email").email("please enter valid email"),
    password: yup.string().required("Please Enter your password"),
  });
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={defaultValue}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
              dispatch(login(true));
              const data = {
                email: values.email,
                password: values.password,
              };
              console.log(data.email);
              axios
                .post("http://localhost:8088/api/login", data)
                .then((res) => {
                  console.log(res);
                  alert(res.data.message);
                  if (res.data.status === 200) {
                    navigate("/dashboard");
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                  alert(err.response.data.message);
                });
            }}
          >
            {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
              <MDBox component="form" role="form" onSubmit={handleSubmit}>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    label="Email"
                    onBlur={handleBlur}
                    fullWidth
                  />
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    label="Password"
                    fullWidth
                  />
                  {errors.password && touched.password ? <div>{errors.password}</div> : null}
                </MDBox>
                {/* <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox> */}
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" type="submit" color="info" fullWidth>
                    sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    {/* <MDTypography
                        component={Link}
                        to="/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MDTypography> */}
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default Basic;
