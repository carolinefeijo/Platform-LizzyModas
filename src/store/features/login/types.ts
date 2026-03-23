export type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
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
