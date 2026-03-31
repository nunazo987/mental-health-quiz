export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  session: {
    access_token: string;
  };
}