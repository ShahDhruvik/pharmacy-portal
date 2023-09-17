import { ROLES } from "../../../utils/constants";

export const users = [
    {
        id: 1,
        email: 'johndoe@gmail.com',
        password: 'hello',
        role: ROLES.ADMIN
    },
    {
        id: 2,
        email: 'smithwill@gmail.com',
        password: 'hola',
        role: ROLES.USER
    }
]