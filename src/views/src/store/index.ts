import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducers from './posts/reducers';
import userReducers from './user/reducers';
import wordsReducers from './words/reducers';

const rootReducer = combineReducers({
  posts: postsReducers,
  user: userReducers,
  words: wordsReducers
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunk];


const store = createStore(
  rootReducer,
  composeWithDevTools( 
    applyMiddleware(...middlewares)
  )
);

export default store;