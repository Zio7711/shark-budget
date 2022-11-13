import "../stylesheets/RegisterPage.scss";

import * as yup from "yup";

import { FormEvent, FormEventHandler, useEffect, useState } from "react";

import { Button } from "@mui/material";
import { DollarLogo } from "../components/AllSVGs";
import TextField from "@mui/material/TextField";
import color from "../utils/color";
import { useFormik } from "formik";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    // .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  isMember: yup.bool(),
});

const RegisterPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const submitHandler = () => {
    console.log("submit");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: submitHandler,
  });

  // global state and useNavigate

  return (
    <form onSubmit={formik.handleSubmit} className="register-page-container">
      <DollarLogo fill={color.main} width="100" />
      <h3>{formik.values.isMember ? "Login" : "Register"}</h3>

      {/* name input */}
      {!formik.values.isMember && (
        <TextField
          id="name"
          label="name"
          variant="outlined"
          color="dark"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      )}

      <TextField
        type="email"
        id="email"
        label="email"
        variant="outlined"
        color="dark"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        id="password"
        label="password"
        variant="outlined"
        color="dark"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        type="password"
      />

      <Button variant="contained" size="large" type="submit">
        Submit
      </Button>

      <p>
        {formik.values.isMember ? "Not a member yet?" : "Already a member?"}
        <Button
          variant="text"
          size="small"
          onClick={() => {
            formik.setFieldValue("isMember", !formik.values.isMember);
          }}
        >
          {formik.values.isMember ? "Register" : "Login"}
        </Button>
      </p>
    </form>
  );
};

export default RegisterPage;
