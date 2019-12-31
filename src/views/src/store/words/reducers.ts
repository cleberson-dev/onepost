import {
  WordsActionTypes, 
  GET_TOP_WORDS, GET_TOP_WORDS_SUCCESS 
} from './types';
import IWord from '../../interfaces/Word.interface';

export interface WordsState {
  items: IWord[];
  isFetching: boolean;
  didFailed: boolean;
} 

const initialState: WordsState = {
  items: [],
  isFetching: false,
  didFailed: false
}

export default function (state = initialState, action: WordsActionTypes) {
  switch (action.type) {
    case GET_TOP_WORDS:
      return { ...state, isFetching: true, didFailed: false };
    case GET_TOP_WORDS_SUCCESS:
      return { items: action.payload, didFailed: false, isFetching: false };
    default:
      return state;
  }
}