export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    mustChangePassword?: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse['user'] | null;
  token: string | null;
}
