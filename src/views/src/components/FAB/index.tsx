import React from 'react';
import { FABContainer } from './styles';
import SVGIcon from '../SVGIcon';

interface FABProps {
  icon: string;
  text: string;
  onClickHandler: React.MouseEventHandler;
  size?: number;
  active?: boolean;
}

function FAB({ icon, onClickHandler, text, size = 1, active = false }: FABProps) {
  return (
    <FABContainer 
      onClick={active ? onClickHandler : () => alert('NO')} 
      size={size}
      active={active}
      >
      <SVGIcon src={icon} color='#FFFFFF' />
    </FABContainer>
  )
}

export default FAB;