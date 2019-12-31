import React from 'react';
import { WordsListContainer, WordsListItem, WordCount, WordName, WordItemContainer } from './styles';

interface Word {
  name: string;
  count: number;
}

interface WordItemProps extends Word {
  pos: number;
}

interface WordsListProps {
  words: Word[];
}

function WordItem({ pos, name, count }: WordItemProps) {
  return (
    <WordItemContainer>
      <WordName>{pos}. {name}</WordName>
      <WordCount>{count} publicações</WordCount>
    </WordItemContainer>
  );
}



function WordsList({ words }: WordsListProps) {
  const wordItems = words.sort((a, b) => b.count - a.count).map((word, idx) => (
    <WordsListItem key={word.name}>
      <WordItem pos={idx + 1} name={word.name} count={word.count} />
    </WordsListItem>
  ));
  
  return (
    <WordsListContainer>
      { wordItems }
    </WordsListContainer>
  );
};

export default WordsList;