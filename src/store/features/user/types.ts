export type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
};

type UserMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UserResponse = {
  data: User[];
  meta: UserMeta;
};

export type FetchUsersResponseAction = {
  type: string;
  payload: UserResponse;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  phone?: string;
};

export type EditUserPayload = {
  id: string;
  user: User;
};

export type DeleteUserPayload = {
  id: number;
};

export type PayloadActions = {
  SetCreateUserRequest: {
    type: string;
    payload: CreateUserPayload;
  };
  FetchUsersSuccess: {
    type: string;
    payload: UserResponse;
  };
  setCreateUserSuccess: {
    type: string;
    payload: {
      user: User;
    };
  };
  setEditUserRequest: {
    type: string;
    payload: {
      user: User;
    };
  };
  setEditUserSuccess: {
    type: string;
    payload: {
      user: User;
    };
  };
  setDeleteUserRequest: {
    type: string;
    payload: {
      id: number;
    };
  };
  setDeleteUserSuccess: {
    type: string;
    payload: {
      id: number;
    };
  };
};
