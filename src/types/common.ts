// All the common types are defined here
import { SetStateAction, Dispatch } from "react";
// Other types regarding the individual entity will have separate file (ex: user.types.ts)
export type PaletteColor = {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
};

export type AuthState = {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export type AuthParams = {
    isAuth: boolean;
    role: string;
};