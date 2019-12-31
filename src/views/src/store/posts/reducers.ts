import IPost from '../../interfaces/Post.interface';
import { 
  CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  GET_POSTS, GET_POSTS_FAIL, GET_POSTS_SUCCESS,
  LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAIL,
  REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAIL,
  PostsActionTypes
} from './types';

export interface PostsState {
  create: { isFetching: boolean; didFailed: boolean; };
  get: { isFetching: boolean; didFailed: boolean; };
  like: { isFetching: boolean; didFailed: boolean };
  items: IPost[];
}

const initialState: PostsState = {
  create: { isFetching: false, didFailed: false }, 
  get: { isFetching: false, didFailed: false },
  like: { isFetching: false, didFailed: false },
  items: []
};

export default function (state = initialState, action: PostsActionTypes) {
  switch(action.type) {
    case LIKE_POST:
      if (!action.currentUser) return state;
      return {
        ...state,
        items: state.items.map(post => 
          post.postId === action.postId ? ({
            ...post, 
            likes: (post.likes.includes(action.currentUser) ? 
              post.likes.filter(likeUser => likeUser !== action.currentUser) : [...post.likes, action.currentUser ]) 
          }) : post
        ),
        like: { isFetching: true, didFailed: false }
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: { isFetching: false, didFailed: false }
      };
    case LIKE_POST_FAIL:
      return {
        ...state,
        like: { isFetching: false, didFailed: true }
      };
    
    case REMOVE_POST:
      return {
        ...state,
        items: state.items.map(post => post.postId === action.postId ? {...post, removeStatus: true } : post)
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        remove: { isFetching: false, didFailed: false },
        items: state.items.filter(post => post.postId !== action.postId)
      };
    case REMOVE_POST_FAIL:
      return {
        ...state,
        remove: { isFetching: false, didFailed: true }
      };

    case CREATE_POST: 
      return { 
        ...state,
        create: { isFetching: true, didFailed: false }
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        create: { isFetching: false, didFailed: false },
        items: [ action.post, ...state.items ]
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        create: { isFetching: false, didFailed: true }
      };

    case GET_POSTS:
      return {
        ...state,
        get: { isFetching: true, didFailed: false }
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        get: { isFetching: false, didFailed: false },
        items: action.posts
      }
    default:
      return state;
  }
}