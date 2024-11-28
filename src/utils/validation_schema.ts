import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


type validationArgument = 'email' | 'password';
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

            default:
                throw new Error(`Unsupported validation argument: ${validationArgument}`);
        }
    }

    return {
        resolver: yupResolver(Yup.object().shape(validationSchema)),
    };
}