
export interface Tokens {
  access_token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  success:boolean
  token?:string;
  message?:string;
}

export interface AuthState {
  access_token: string;
  loading: boolean;
  error: string | null | undefined;
}