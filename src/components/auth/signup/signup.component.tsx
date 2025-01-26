import React, {useState} from "react";
import styles from './singup.module.css';
import {useForm} from "react-hook-form";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {getValidationObject} from "../../../utils/validation_schema.ts";


type FormData = {
    email?: string;
    password?: string;
    password_confirmation?: string;
};

// component-name.component.tsx
export default function SignUpComponent() {

    const formOptions = getValidationObject(["email", "password","password_confirmation"]);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(formOptions);

    const [disabledState ,setDisabledState]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
   
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm((prev) => !prev);
    };

    const handleMouseDownPasswordConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                <div className={styles.image}></div>
                <div className={styles.formLogin}>
                    <h1 style={{color:'#46586c',marginBottom:"10px"}}>إنشاء حساب</h1>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}
                         noValidate sx={{ mt: 1 }}>

                        <TextField
                            sx={{my:1}}
                            required
                            fullWidth
                            id="user_name"
                            label="user name"
                            autoComplete="user_name"
                            autoFocus
                            // {...register("email")}
                            // error={!!errors.email}
                            // helperText={errors.email?.message}
                        />   
                        <TextField
                            sx={{my:1}}
                            required
                            fullWidth
                            id="phone"
                            label="phone"
                            autoComplete="phone"
                            // {...register("email")}
                            // error={!!errors.email}
                            // helperText={errors.email?.message}
                            />  
                        <TextField
                            sx={{my:1}}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                          sx={{my:1}}
                          
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
                          <TextField
                            sx={{my:1}}
                            required
                            fullWidth
                            id="password_confirmation"
                            label="password confirmation"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            {...register("password_confirmation")}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirm}
                                            onMouseDown={handleMouseDownPasswordConfirm}
                                        >
                                            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt:1, mb: 2, bgcolor: "#475767", fontSize:'20px'}}
                            disabled={disabledState}
                        >
                           إنشاء حساب
                        </Button>

                    </Box>
                </div>
                {/*<div>*/}
                {/*    <div style={{backgroundColor:"#D2E0FB"}}>D2E0FB</div>*/}
                {/*    <div style={{backgroundColor:"#FEF9D9"}}>FEF9D9</div>*/}
                {/*    <div style={{backgroundColor:"#DEE5D4"}}>DEE5D4</div>*/}
                {/*    <div style={{backgroundColor:"#8EACCD"}}>8EACCD</div>*/}

                {/*</div>*/}
            </div>
        </div>

    );
}