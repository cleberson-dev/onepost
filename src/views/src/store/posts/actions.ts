import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { PostsState } from './reducers';
import { 
  GET_POSTS, GET_POSTS_FAIL, GET_POSTS_SUCCESS,
  LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAIL,
  REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAIL,
  CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
  PostsActionTypes
} from './types';
import IPost from '../../interfaces/Post.interface';

type PostThunkDispatcher = ThunkDispatch<PostsState, undefined, PostsActionTypes>;

export const getPosts = () => (dispatch: PostThunkDispatcher) => {
  dispatch({ type: GET_POSTS });

  return axios.get('http://localhost:8080/posts')
    .then((res) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        posts: res.data.map((post: any) => ({
          postId: post.id,
          content: post.content,
          publisher: post.publisher,
          likes: post.likes,
          pubDate: new Date(post.pubDate)
        }))
      });
    });
}

export const createPost = 
  (content: string) => 
  (dispatch: PostThunkDispatcher) => {
    dispatch({ type: CREATE_POST });

    const token = sessionStorage.getItem('token');

    if (!token) dispatch({ type: CREATE_POST_FAIL, message: 'Token doesnt exist.' });

    axios.post('http://localhost:8080/posts', { content }, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      const post = res.data;
      dispatch({ 
        type: CREATE_POST_SUCCESS,
        post: {
          ...post,
          postId: post._id,
          likes: [],
          pubDate: new Date(post.pubDate)
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: CREATE_POST_FAIL, message: err.message });
    });
}

export const likePost = (postId: string) => (dispatch: PostThunkDispatcher) => {
  const currentUser = sessionStorage.getItem('user.username') || '';
  
  dispatch({
    type: LIKE_POST,
    postId,
    currentUser
  });

  const token = sessionStorage.getItem('token');
  if (!token) dispatch({ type: LIKE_POST_FAIL });

  axios.patch(`http://localhost:8080/posts/${postId}/likes`, {}, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => dispatch({ type: LIKE_POST_SUCCESS }))
  .catch(err => dispatch({ type: LIKE_POST_FAIL }));
}

export const removePost = (postId: string) => (dispatch: PostThunkDispatcher) => {
  dispatch({
    type: REMOVE_POST,
    postId
  });

  const token = sessionStorage.getItem('token');
  if (!token) dispatch({ type: CREATE_POST_FAIL, message: 'Token doesnt exist.' });

  axios.delete(`http://localhost:8080/posts/${postId}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => dispatch({ type: REMOVE_POST_SUCCESS, postId }))
  .catch(err => {
    console.log(err) 
    dispatch({ type: REMOVE_POST_FAIL });
  });
}