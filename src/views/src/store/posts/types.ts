import IPost from '../../interfaces/Post.interface';

export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAIL = 'CREATE_POST_FAIL';

export const LIKE_POST = 'LIKE_POST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAIL = 'LIKE_POST_FAIL';

export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';

interface GetPostsAction {
  type: typeof GET_POSTS;
}

interface GetPostsSuccessAction {
  type: typeof GET_POSTS_SUCCESS;
  posts: IPost[];
}

interface GetPostsFailAction {
  type: typeof GET_POSTS_FAIL;
}

interface CreatePostAction {
  type: typeof CREATE_POST;
}

interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
  post: IPost;
}

interface CreatePostFailAction {
  type: typeof CREATE_POST_FAIL;
  message: any;
}

interface LikePostAction {
  type: typeof LIKE_POST;
  postId: string;
  currentUser: string;
}

interface LikePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
}

interface LikePostFailAction {
  type: typeof LIKE_POST_FAIL;
}

interface RemovePostAction {
  type: typeof REMOVE_POST;
  postId: string;
}

interface RemovePostSuccessAction {
  type: typeof REMOVE_POST_SUCCESS;
  postId: string;
}

interface RemovePostFailAction {
  type: typeof REMOVE_POST_FAIL;
}

export type PostsActionTypes = 
  LikePostAction | LikePostSuccessAction | LikePostFailAction |
  RemovePostAction | RemovePostSuccessAction | RemovePostFailAction |
  CreatePostAction | CreatePostSuccessAction | CreatePostFailAction |
  GetPostsAction | GetPostsSuccessAction | GetPostsFailAction;