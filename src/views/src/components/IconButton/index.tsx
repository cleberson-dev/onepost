import React from 'react';
import { IconButtonContainer, IconButtonIcon } from './styles';
import SVGIcon from '../SVGIcon';

interface IconButtonProps {
  iconPath: string;
  size?: number;
  onClickHandler?: React.MouseEventHandler;
  text: string;
}

function IconButton({ iconPath, onClickHandler, size = 1, text }: IconButtonProps) {
  return (
    <IconButtonContainer size={size} onClick={onClickHandler ? onClickHandler : (e) => ({})}>
      <SVGIcon src={iconPath} alt={text} color='#FFFFFF'  />
    </IconButtonContainer>
  );
}

export default IconButton;