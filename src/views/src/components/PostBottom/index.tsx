import React from 'react';
import {
  PostBottomContainer, 
  PostBottomDetailContainer, 
  PostBottomDetailText, 
  PostBottomDetailIcon 
} from './styles';
import SVGIcon from '../SVGIcon';

interface PostBottomDetailProps {
  icon: string;
  text: string;
  color?: string;
  onClickHandler?: React.MouseEventHandler;
}

export function PostBottomDetail({ icon, text, color='#9C9C9C', onClickHandler }: PostBottomDetailProps) {
  return (
    <PostBottomDetailContainer 
      as={onClickHandler ? 'button' : 'span' }
      cursor={onClickHandler ? 'pointer' : 'default' } 
      onClick={onClickHandler}
    >
      <PostBottomDetailIcon size={1.2}>
        <SVGIcon src={icon} color={color} alt={text} />
      </PostBottomDetailIcon>
        <PostBottomDetailText color={color}>{text}</PostBottomDetailText>
    </PostBottomDetailContainer>
  );
}

export default PostBottomContainer;