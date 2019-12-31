import React, { ReactElement } from 'react';
import { PostInfoContainer, PostInfoLabel } from './styles';

type PostInfoProps = { 
  label: string;
  component: ReactElement;
  align?: string;
};

const getProperAlignment = (option?: string) => {
  const defaultValue = 'flex-start';

  if (!option) return defaultValue;

  switch (option) {
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'left':
    default:
      return defaultValue;
  }
}

const PostInfo = ({ label, component, align }: PostInfoProps) => {
  return (
    <PostInfoContainer align={getProperAlignment(align)}>
      <PostInfoLabel children={label} />
      {component}
    </PostInfoContainer>
  );
}

export default PostInfo;
