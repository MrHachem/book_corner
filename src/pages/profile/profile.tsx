import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showNotifications } from "../../utils/notifications";
import { usersServices } from "../../ services/api/usersServices";
import { authServices } from "../../ services/api/authServices";
import { getValidationObject } from "../../utils/validation_schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type EditProfile = {
  lastname?: string;
  firstname?: string;
  email: string;
  phone?: number;
  current_password: string;
  password?: string;
  password_confirmation?: string;
};
type FormData = {
  phone: string;
};


export function ProfilePage() {

  const formOptions = getValidationObject(["phone"]);

  
  const phoneValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^09\d{8}$/, "Phone number must start with 09 and be 10 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(phoneValidationSchema), // إضافة التحقق مباشرة هنا
  });

  const [user, setUser] = useState<EditProfile | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [newFirstname, setNewFirstname] = useState(user?.firstname);
  const [newLastname, setNewLastname] = useState(user?.lastname);
  const [newEmail, setNewEmail] = useState(user?.email);
  const [newPhone, setNewPhone] = useState(user?.phone);
  const [newCurrentPassword, setNewCurrentPassword] = useState(
    user?.current_password
  );
  const [newPassword, setNewPassword] = useState(user?.password);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(
    user?.password_confirmation
  );

  const profile_string = localStorage.getItem("profile");
  const profile = profile_string ? JSON.parse(profile_string) : {};

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      showNotifications(
        "Cannot accsess to profile page without signin",
        "warning"
      );
      showNotifications("please signin if you have an account", "warning");

      navigate("/auth/login");
    }
  }, [navigate, token]);

  const getUser = useCallback(async () => {
    try {
      const response = await usersServices.getUser(profile?.id);
      response?.status === 200
        ? setUser(response?.data)
        : showNotifications(
            "There may be a problem loading your profile information. Please refresh the page to see the updated information.",
            "info"
          );
    } catch (error: unknown) {}
  }, []);

  useEffect(() => {
    getUser();
  }, [profile?.id]);

  const handleKeyUp = (event: any) => {
    let keyName = event.target.name;
    switch (keyName) {
      case "firstname":
        setNewFirstname(event.target.value);
        break;
      case "lastname":
        setNewLastname(event.target.value);
        break;
      case "email":
        setNewEmail(event.target.value);
        break;
      case "phone":
        setNewPhone(event.target.value);
        break;
      case "current_password":
        setNewCurrentPassword(event.target.value);
        break;
      case "password_confirmation":
        setNewPasswordConfirmation(event.target.value);
        break;
      case "password":
        setNewPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const onSubmit = async () => {
    let data: Partial<EditProfile> = {};
    if (newFirstname && newFirstname !== user?.firstname) {
      data.firstname = newFirstname;
    }
    if (newLastname && newLastname !== user?.lastname) {
      data.lastname = newLastname;
    }
    if (newEmail && newEmail !== user?.email) {
      data.email = newEmail;
    }
    if (newPhone && newPhone !== user?.phone) {
      data.phone = newPhone;
    }
    if (newCurrentPassword && newCurrentPassword !== user?.current_password) {
      data.current_password = newCurrentPassword;
    }
    if (newPassword && newPassword !== user?.password) {
      data.password = newPassword;
    }
    if (
      newPasswordConfirmation &&
      newPasswordConfirmation !== user?.password_confirmation
    ) {
      data.password_confirmation = newPasswordConfirmation;
    }

    if (Object.keys(data).length > 0) {
      console.log("data", data);
      try {
        const response = await authServices.updateProfile(data);
        if (response?.status === 200) {
          showNotifications(
            "Profile has been modified successfully.",
            "success"
          );
          getUser();
        }
      } catch (error) {
        showNotifications("Profile was not modified successfully.", "error");
      }
    }
    setEditMode(!editMode);
  };
  const avatar =
    profile.gender === "male" ? "/male.jpg" : "/female.jpg";
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Left Panel: Profile */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: "89px" }}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ margin: "33px" }}
              >
                <Avatar
                  sx={{ width: 250, height: 300, mb: 2 }}
                  src={avatar}
                  alt="User Avatar"
                />

                <>
                  <Typography variant="h4">
                    {user?.firstname} {user?.lastname}
                  </Typography>
                </>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel: Favorite Books */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                padding: editMode ? "15px" : "100px",
                display: "flex",
                flexDirection: editMode ? "column" : "column",
                flex: "auto",
                alignContent: "space-around",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {editMode ? (
                <Box
                  sx={{ height: "100%" }}
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <TextField
                      sx={{ my: 1, marginRight: "7px" }}
                      required
                      fullWidth
                      name="firstname"
                      label="first name"
                      autoComplete="firstname"
                      onKeyUp={handleKeyUp}
                    />
                    <TextField
                      sx={{ my: 1, marginRight: "7px" }}
                      required
                      fullWidth
                      name="lastname"
                      label="last name"
                      autoComplete="lastname"
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <TextField
                      sx={{ my: 1, marginRight: "7px" }}
                      fullWidth
                      label="Email"
                      name="email"
                      defaultValue={user?.email}
                      onKeyUp={handleKeyUp}
                    />
                    <TextField
                      sx={{ my: 1, marginRight: "7px" }}
                      fullWidth
                      label="Phone"
                      defaultValue={user?.phone}
                      onKeyUp={handleKeyUp}
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </div>

                  <TextField
                    fullWidth
                    label="current password"
                    name="current_password"
                    onKeyUp={handleKeyUp}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="new password"
                    name="password"
                    onKeyUp={handleKeyUp}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="password confirmation"
                    name="password_confirmation"
                    value={user?.password_confirmation}
                    onKeyUp={handleKeyUp}
                    sx={{ mb: 2 }}
                  />
                </Box>
              ) : (
                <>
                  <Typography variant="h5">
                    {user?.firstname} {user?.lastname}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Email: {user?.email}
                  </Typography>
                  <Typography color="textSecondary">
                    Phone: {user?.phone}
                  </Typography>
                </>
              )}

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={editMode ? handleSubmit(onSubmit) : toggleEditMode}
              >
                {editMode ? "Save" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
