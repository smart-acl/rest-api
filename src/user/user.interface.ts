export interface UserData {
    id: number;
    username: string;
    email: string;
}

export interface UserRO {
    user: UserData;
}

export interface TokenResponse {
    access_token: string;
}
