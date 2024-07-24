import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, Chip } from "@mui/material";
import { RootState } from "../../../src/App/Store";
import { SkillsEntry, addSkill, deleteSkill } from "./SkillsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const SkillsForm: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.skill);

  const validationSchema = Yup.object({
    skill: Yup.string().trim().required("Skill cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addSkill({ skill: values.skill }));
      formik.resetForm();
    },
  });

  const handleDeleteSkill = (index: number) => {
    dispatch(deleteSkill(index));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          {skills.entries.map((entry: SkillsEntry, index: number) => (
            <Chip
              key={index}
              color="secondary"
              label={entry.skill}
              onDelete={() => handleDeleteSkill(index)}
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            size="small"
            id="skill"
            name="skill"
            label="Skill"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.skill}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.skill && Boolean(formik.errors.skill)}
            helperText={formik.touched.skill && formik.errors.skill}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: "7px", marginLeft: "5px" }}
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SkillsForm;
