import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { getValidationObject } from "../../../utils/validation_schema.ts";
import { showNotifications } from "../../../utils/notifications.ts";
import { useAuth } from "../../../context/AuthContext.tsx";
import { authServices } from "../../../ services/api/authServices.ts";

type FormData = {
  email?: string;
  password?: string;
};

// component-name.component.tsx
export default function LoginComponent() {
  const formOptions = getValidationObject(["email", "password"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(formOptions);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [disabledState, setDisabledState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleNavigate = () => {
    navigate("/all-books");
  };
  const onSubmit = async (data: FormData) => {
    setDisabledState(true);
    const response = await authServices.Login(data, setToken);
    if (response?.status === 200) {
      showNotifications("Login succses", "success");
      navigate(`/all-books`);
    }
    setDisabledState(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.imageLogin}></div>
        <div className={styles.formLogin}>
          <Tooltip title="back to home">
            <IconButton aria-label="add" onClick={handleNavigate}>
              <ArrowBack />
            </IconButton>
          </Tooltip>

          <h1 style={{ color: "#46586c" }}>تسجيل الدخول</h1>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#475767", fontSize: "20px" }}
              disabled={disabledState}
            >
              تسجيل الدخول
            </Button>
          </Box>
          <Link to={"/auth/sign-up"}>انشاء حساب</Link>
        </div>
      </div>
    </div>
  );
}
