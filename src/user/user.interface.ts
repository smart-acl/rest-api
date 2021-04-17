export interface UserData {
    id: number;
    username: string;
    email: string;
    bio: string;
    image?: string;
}

export interface UserRO {
    user: UserData;
}

export interface TokenResponse {
    access_token: string;
}
