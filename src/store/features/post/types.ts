export type Post = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  size?: string;
  userId: 1;
  createdAt: string;
  updatedAt: string;
};

type UserMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PostsResponse = {
  data: Post[];
  meta: UserMeta;
};

export type PostDetailsResponse = {
  data: Post;
};

export type PayloadActions = {
  FetchPostsRequest: {
    type: string;
  };
  FetchPostsSuccess: {
    type: string;
    payload: PostsResponse;
  };
  FetchPostDetailsRequest: {
    type: string;
    payload: {
      id: number;
    };
  };
  FetchPostDetailsSuccess: {
    type: string;
    payload: PostDetailsResponse;
  };
};
