export interface LoginData {
    name: string;
    password: string;
}

export interface LoginResponse {
    user_id: number;
    token: string;
}

export interface RegisterData {
    name: string;
    surname: string;
    location: string;
    contact: string;
    password: string;
    role: string;
}
