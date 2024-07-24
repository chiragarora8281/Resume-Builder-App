import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { RootState } from "../../../src/App/Store";
import { updatePersonalInfo } from "./PersonalInfoSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.personalInfo);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Phone must be exactly 10 digits and only contain numbers"
      )
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: personalInfo,
    validationSchema: validationSchema,
    onSubmit: () => {}, // Add an empty function as the onSubmit property
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
    formik.handleChange(e); // This is required to update Formik's internal state
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            size="small"
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            sx={{ width: "40%" }}
            margin="normal"
            value={formik.values.firstName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={
              formik.touched.firstName && formik.errors.firstName?.toString()
            }
          />
          <TextField
            size="small"
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            sx={{ width: "55%" }}
            margin="normal"
            value={formik.values.lastName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName && formik.errors.lastName?.toString()
            }
          />
        </Box>
        <TextField
          size="small"
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email?.toString()}
        />
        <TextField
          size="small"
          id="phone"
          name="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formik.values.phone}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone?.toString()}
        />
        <TextField
          size="small"
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formik.values.address}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={
            formik.touched.address && formik.errors.address?.toString()
          }
        />
      </form>
    </Box>
  );
};

export default PersonalInfoForm;
