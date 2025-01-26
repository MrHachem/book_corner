import React, {useState} from "react";
import styles from './Login.module.css';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {getValidationObject} from "../../../utils/validation_schema.ts";


type FormData = {
    email?: string;
    password?: string;
};

// component-name.component.tsx
export default function LoginComponent() {

    const formOptions = getValidationObject(["email", "password"]);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(formOptions);

    const [disabledState ,setDisabledState]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: FormData) => {
        setDisabledState(true);
        console.log("LoginComponent successful", data.email);
        setDisabledState(false);
    };


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.imageLogin}></div>
                <div className={styles.formLogin}>
                    <h1 style={{color:'#46586c'}}>تسجيل الدخول</h1>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}
                         noValidate sx={{ mt: 1 }}>
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
                            type={showPassword ? 'text' : 'password'}
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
                            sx={{ mt: 3, mb: 2, bgcolor: "#475767", fontSize:'20px'}}
                            disabled={disabledState}
                        >
                            تسجيل الدخول
                        </Button>

                    </Box>
                    <Link to={"/auth/sign-up"}>انشاء حساب</Link>
                </div>
                <div>
                   <div style={{backgroundColor:"#D2E0FB"}}>D2E0FB</div>
                   <div style={{backgroundColor:"#FEF9D9"}}>FEF9D9</div>
                   <div style={{backgroundColor:"#DEE5D4"}}>DEE5D4</div>
                   <div style={{backgroundColor:"#8EACCD"}}>8EACCD</div>

                </div>
            </div>
        </div>

    );
}