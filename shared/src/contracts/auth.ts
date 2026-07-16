export interface SessionUser {
  id: string;
  email: string;
}

export interface SessionState {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

