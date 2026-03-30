export type LoginPayload = {
  token?: string;
  user: {
    email: string;
    password: string;
  };
  navigate?: (path: string) => void;
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
