import { User } from "src/app/core/services/auth/models/user.model";

export interface AuthState {
  user: User | null;
  loggedOut?: boolean;
  redirect: boolean | null;
  isConnected: boolean;
}

export const initialState: AuthState = {
  user: null,
  loggedOut: true,
  redirect: false,
  isConnected: false
};

