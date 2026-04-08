export type Post = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  size?: string;
  userId: 1;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  count: {
    likes: number;
  };
};

type UserMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreatePostPayload = {
  image?: File | null;
  name: string;
  price: number;
  category: string;
  description?: string;
  size?: string;
  userId: number;
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
  setCreatePostRequest: {
    type: string;
    payload: CreatePostPayload;
  };
  setCreatePostSuccess: {
    type: string;
    payload: {
      post: Post;
    };
  };
};
