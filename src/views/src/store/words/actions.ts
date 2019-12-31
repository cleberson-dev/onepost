import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { WordsState } from './reducers';
import { 
  WordsActionTypes,
  GET_TOP_WORDS, GET_TOP_WORDS_SUCCESS 
} from './types';


type WordsThunkDispatcher = ThunkDispatch<WordsState, undefined, WordsActionTypes>;

export const getTopWords = () => (dispatch: WordsThunkDispatcher) => {
  dispatch({ type: GET_TOP_WORDS });

  axios
    .get('http://localhost:8080/words')
    .then(res => dispatch({ type: GET_TOP_WORDS_SUCCESS, payload: res.data }))
    .catch(err => console.log(err));
}