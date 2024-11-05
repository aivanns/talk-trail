export interface DecodedToken {
    exp: number;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthReturn {
    success: boolean;
    message?: string;
}
