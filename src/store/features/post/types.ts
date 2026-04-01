export type Post = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  userId: 1;
};

export type PayloadActions = {
  FetchPostsRequest: {
    type: string;
  };
};
