import IWord from '../../interfaces/Word.interface';

export const GET_TOP_WORDS = 'GET_TOP_WORDS';
export const GET_TOP_WORDS_SUCCESS = 'GET_TOP_WORDS_SUCCESS';
export const GET_TOP_WORDS_FAIL = 'GET_TOP_WORDS_FAIL';

interface GetTopWordsAction {
  type: typeof GET_TOP_WORDS;
}

interface GetTopWordsSuccessAction{
  type: typeof GET_TOP_WORDS_SUCCESS;
  payload: IWord[];
}

export type WordsActionTypes =
  GetTopWordsAction | GetTopWordsSuccessAction;
