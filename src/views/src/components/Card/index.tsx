import React, { ReactElement } from 'react';
import { CardContainer } from './styles';

interface CardProps { 
  children?: ReactElement;
  styles?: { padding?: string };
};

const Card = ({ children, styles }: CardProps) => {
  return (
    <CardContainer 
      padding={styles ? styles.padding : '' }  
    >
      { children }
    </CardContainer>
  );
};

export default Card;
