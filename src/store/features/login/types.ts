export type LoginPayload = {
  user: {
    email: string;
    password: string;
  };
  navigate?: (path: string) => void; // Adicione esta linha
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
