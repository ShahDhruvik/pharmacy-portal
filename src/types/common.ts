// All the common types are defined here
import { SetStateAction, Dispatch, } from "react";
import { ALIGN_DIALOG, FORMTYPE } from "../utils/constants";
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

export type CacheType = {
    cacheData: Record<string, any>
    cacheExpDate: Record<string, string | undefined>
}

export type HeaderLinkType = {
    id: number,
    name: string,
    path: string
}

export type AlignDialogProp = ALIGN_DIALOG.BOTTOM_LEFT | ALIGN_DIALOG.BOTTOM_RIGHT | ALIGN_DIALOG.TOP_LEFT | ALIGN_DIALOG.TOP_RIGHT

export type LoadingState = {
    loading: { isLoading: boolean, isPage: boolean, pageProps?: { image: any, pageTxt: string } };
    setLoading: Dispatch<SetStateAction<{ isLoading: boolean, isPage: boolean, pageProps?: { image: any, pageTxt: string, } }>>;
};

export type FormType = FORMTYPE.SIGNIN | FORMTYPE.SIGNUP | FORMTYPE.OTP | FORMTYPE.GUEST

export type FormTypeArray = Array<FormType>
export type SelectDDL = { label: string, _id: string }

