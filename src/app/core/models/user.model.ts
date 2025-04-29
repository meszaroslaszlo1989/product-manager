import { UserRole } from "../enums/user-role.enum";

export interface User {
    id: number;
    username: string;
    password: string;
    email?: string;
    role?: UserRole;
}