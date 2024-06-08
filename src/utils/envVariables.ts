// All the environment variables are destructed and exported from here for easy access.
enum ConstVariables {
    //Server
    CONST_API_URL = "https://api-dev.oopchar.com/api",
    CONST_FRONTEND_URL = "http://localhost:4005",
    CONST_IMAGE_URL = "https://oopchar-editor-dev-1.s3.ap-south-1.amazonaws.com/",
    CONST_SOCKET_SERVER_URL = "https://api-dev.oopchar.com",
    CONST_ABHA_URL = "https://abha-dev.triainahealth.com/",
    CONST_RE_CAPTCHA_KEY = "6Ld_4aEpAAAAABDjW7LicoeJvdvaPV4nkYUWZ7NH",
    //Local
    // CONST_API_URL = "http://localhost:8000/api",
    // CONST_FRONTEND_URL = "http://localhost:4005",
    // CONST_IMAGE_URL = "https://oopchar-editor-dev-1.s3.ap-south-1.amazonaws.com/",
    // CONST_SOCKET_SERVER_URL = "http://localhost:8000",
    // CONST_ABHA_URL = "https://abha-dev.triainahealth.com/",
    // CONST_RE_CAPTCHA_KEY = "6Ld_4aEpAAAAABDjW7LicoeJvdvaPV4nkYUWZ7NH",
}

export const { CONST_API_URL, CONST_FRONTEND_URL, CONST_IMAGE_URL, CONST_SOCKET_SERVER_URL } = ConstVariables;
export const {
    VITE_APP_API_URL,
    VITE_APP_FRONTEND_URL,
    VITE_APP_IMAGE_URL,
    VITE_APP_SOCKET_SERVER_URL,
    VITE_APP_ABHA_URL,
    VITE_APP_RE_CAPTCHA_KEY,
} = import.meta.env;