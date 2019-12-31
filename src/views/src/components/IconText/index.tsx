import React from 'react';
import { IconTextContainer, IconTextIcon, IconTextText } from './styles';

interface IconTextProps {
  iconPath: string;
  text: string;
  color?: string;
}

function IconText({ iconPath, text, color }: IconTextProps) {
  return (
    <IconTextContainer>
      <IconTextIcon src={iconPath} />
      <IconTextText color={color}>{text}</IconTextText>
    </IconTextContainer>
  );
}

export default IconText;