export interface LoginData {
    name: string;
    password: string;
}

export interface LoginResponse {
    user_id: number;
    token: string;
}

export interface UserData {
    name: string;
    surname: string;
    location: string;
    contact: string;
    password: string;
    role: string;
    id: number;
}
