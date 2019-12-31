import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordsContainer, WordsHeader } from './styles';
import Card from '../../components/Card';
import Title from '../../components/Title';
import WordsList from '../../components/WordsList';
import Navbar from '../../components/Navbar';

import { AppState } from '../../store';
import { getTopWords } from '../../store/words/actions';


function Words() {
  const dispatch = useDispatch();
  const words = useSelector((state: AppState) => state.words.items);

  useEffect(() => { 
    dispatch(getTopWords());
  });

  const navLinks = [
    { link: '/', title: 'Feed' },
    { link: '/words', title: 'Palavras' }
  ];

  return (
    <React.Fragment>
      <Navbar links={navLinks} />
      <WordsContainer>
        <Card>
          <div style={{ width: '100%' }}>
            <WordsHeader>
              <Title text='Palavras mais utilizadas' />
            </WordsHeader>
          { words ? <WordsList words={words} /> : '' }
          </div>
        </Card>
      </WordsContainer>
    </React.Fragment>
  );
};

export default Words;