export type LoginPayload = {
  token?: string;
  user: {
    id?: number;
    name?: string;
    email: string;
    password: string;
    phone?: string | null;
  };
  navigate?: (path: string) => void;
};

export type User = {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  phone?: string | null;
};

export type LoginResponse = {
  user: LoginPayload;
};

export type PayloadActions = {
  setLoginUserRequest: {
    type: string;
    payload: LoginPayload;
  };
  setLoginUserSuccess: {
    type: string;
    payload: {
      user: LoginPayload;
    };
  };
};
