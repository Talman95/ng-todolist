export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
}

export interface MeResponse {
  id: number;
  email: string;
  login: string;
}
