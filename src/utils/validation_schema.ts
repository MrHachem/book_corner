import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


type validationArgument = 'email' | 'password'|'password_confirmation'|'phone'|'lastname'|'firstname';
export function getValidationObject(validationArguments: validationArgument[]) {
    const validationSchema: Record<string, Yup.AnySchema> = {};

    for (const validationArgument of validationArguments) {
        switch (validationArgument) {
            case "email":
                validationSchema["email"] = Yup.string()
                    .required("Email is required")
                    .email("Must be a valid email")
                    .matches(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        "Email must be in a standard format with a domain like example@example.com"
                    );
                break;

            case "password":
                validationSchema["password"] = Yup.string()
                    .required("Password is required")
                    .min(6, "Password must be at least 6 characters long");
                break;

            case "password_confirmation":
                 validationSchema['password_confirmation'] = Yup.string()
                .required('Password confirmation is required')
                .oneOf([Yup.ref('password'), ' '], 'Password confirmation must match');
            break;
            case "phone":
            validationSchema["phone"] = Yup.string()
            .required('phone is required');
            break;
            case "lastname":
            validationSchema["lastname"] = Yup.string()
            .required('last name is required');
            break;
            case "firstname":
            validationSchema["firstname"] = Yup.string()
            .required('firstname is required');
            break;
            default:
                throw new Error(`Unsupported validation argument: ${validationArgument}`);
        }
    }

    return {
        resolver: yupResolver(Yup.object().shape(validationSchema)),
    };
}