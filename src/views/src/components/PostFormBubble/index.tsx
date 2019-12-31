import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createPost } from '../../store/posts/actions';
import { PostContentInput, PostFormBubbleContainer, PostLengthCounter } from './styles';
import IconButton from '../IconButton';
import send from '../../img/send.svg';

const MAX_CONTENT_LENGTH = 180;


const PostSubmitButton = styled(IconButton).attrs(props => ({
  type: 'submit'
}))`
  grid-column: 3;
`;

interface PostInputProps {
  value: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLTextAreaElement>;
}
function PostInput({ value, onChangeHandler }: PostInputProps) {
  return <PostContentInput 
    placeholder='O que está pensando hoje?' 
    value={value} 
    onChange={onChangeHandler}
    maxLength={MAX_CONTENT_LENGTH}
  />
}

interface PostFormBubbleProps {
  onSubmit: React.FormEventHandler
}

function PostFormBubble({ onSubmit }: PostFormBubbleProps) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(createPost(content));

    onSubmit(e);
  };

  return (
    <PostFormBubbleContainer onSubmit={onSubmitHandler}>
      <PostInput 
        value={content} 
        onChangeHandler={(e) => setContent(e.target.value)} 
      />
      <PostLengthCounter>{`${content.length}/${MAX_CONTENT_LENGTH}`}</PostLengthCounter>
      <PostSubmitButton 
        iconPath={send} 
        size={1.4} 
        text='Poste o seu conteúdo.'
      />
    </PostFormBubbleContainer>
  );
}

export default PostFormBubble;