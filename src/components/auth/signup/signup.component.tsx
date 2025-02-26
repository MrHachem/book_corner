import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './singup.module.css';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {getValidationObject} from "../../../utils/validation_schema.ts";
import { authServices } from "../../../ services/authServices.ts";
import { showNotifications } from "../../../utils/notifications.ts";


type FormData = {
    gender?:string;
    lastname?:string;
    firstname?:string;
    phone?:number;
    email?: string;
    password?: string;
    password_confirmation?: string;
};

// component-name.component.tsx
export default function SignUpComponent() {

    const formOptions = getValidationObject(["email", "password","password_confirmation","phone","lastname","firstname"]);
    const { register, handleSubmit,control, formState: { errors } } = useForm<FormData>(formOptions);
    const navigate = useNavigate();
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
        try{
            const response = await authServices.register(data);
            if(response?.status === 200){
                showNotifications("تم إنشاء الحساب بنجاح! 🎉","success")
                navigate(`/all-books`);
            }
          
        }
        catch(error){
            console.log("خطأ غير متوقع! حاول مرة أخرى.", "error");
        }
      
        setDisabledState(false);
    };


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col1}><img src="../../../../public/Sign up.gif"/></div>
                    <div className={styles.col2}>
                        <h1 style={{color:'#46586c',marginBottom:"1px"}}>إنشاء حساب</h1>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}
                            noValidate sx={{marginTop: '0px' }}>
                            <div style={{display: 'flex'}}>
                                <TextField
                                    sx={{my:0.5,marginRight:'7px'}}
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="first name"
                                    autoComplete="firstname"
                                    autoFocus
                                    {...register("firstname")}
                                    error={!!errors.firstname}
                                    helperText={errors.firstname?.message}
                                />   
                                <TextField
                                    sx={{my:0.5,marginRight:'7px'}}
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="last name"
                                    autoComplete="lastname"
                                    autoFocus
                                    {...register("lastname")}
                                    error={!!errors.lastname}
                                    helperText={errors.lastname?.message}
                                /> 
                            </div>
                        
                            <TextField
                                sx={{my:0.5}}
                                required
                                fullWidth
                                id="phone"
                                label="phone"
                                autoComplete="phone"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                />  
                            <TextField
                                sx={{my:0.5}}
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
                            sx={{my:0.5}}
                            
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
                                sx={{my:0.5}}
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
                                <FormLabel id="gender-label">Gender</FormLabel>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue="female"
                                    render={({field})=>(
                                        <RadioGroup
                                            row
                                            {...field}
                                            >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    )}
                                />
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