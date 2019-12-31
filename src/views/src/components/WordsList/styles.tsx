import styled from 'styled-components';

export const WordsListContainer = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const WordsListItem = styled.a`
`;

export const WordItemContainer = styled.li`
  list-style: none;
  padding: 2rem 1.5rem;
  cursor: pointer; 

  :hover {
    background-color: #F8F8F8;
    color: ${props => props.theme.colors.primary};
  }
`;

export const WordName = styled.div`
  font-weight: bold;
  
  &:hover {
    
  }
`;

export const WordCount = styled.span`
  font-size: 0.9rem;
  color: #9C9C9C;
`;
