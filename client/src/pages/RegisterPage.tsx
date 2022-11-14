import "../stylesheets/RegisterPage.scss";

import * as yup from "yup";

import { FormikValues, useFormik } from "formik";
import { registerUser, selectAuth } from "../store/authSlice";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { DollarLogo } from "../components/AllSVGs";
import React from "react";
import TextField from "@mui/material/TextField";
import color from "../utils/color";
import useAppDispatch from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
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

const loginSchema = yup.object({
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

const RegisterPage: React.FC = () => {
  const [isMember, setIsMember] = useState<Boolean>(true);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setTimeout(() => {
        navigate("/");
      }, 1800);
    }
  }, [auth.user, navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const submitHandler = (values: FormikValues, actions: any) => {
    if (isMember) {
      console.log("Login");
    } else {
      const { name, email, password } = values;
      dispatch(registerUser({ name, email, password }));
    }
  };

  const validationSchema = isMember ? loginSchema : registerSchema;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="register-page-container">
      <DollarLogo fill={color.main} width="100" />
      <h3>{isMember ? "Login" : "Register"}</h3>

      {/* name input */}
      {!isMember && (
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

      <Button
        variant="contained"
        size="large"
        type="submit"
        disabled={auth.isLoading}
      >
        Submit
      </Button>

      <p>
        {isMember ? "Not a member yet?" : "Already a member?"}
        <Button
          variant="text"
          size="small"
          onClick={() => {
            // update the member state
            setIsMember(!isMember);
            // clear the field
            formik.resetForm();
          }}
        >
          {isMember ? "Register" : "Login"}
        </Button>
      </p>
    </form>
  );
};

export default RegisterPage;
