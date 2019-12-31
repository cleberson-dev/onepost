import styled from 'styled-components';

interface PostInfoContainerProps {
  align: string;
}

export const PostInfoContainer = styled.div<PostInfoContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align};
  justify-content: space-between;
  margin-top: 0.4rem;
  cursor: default;
`;

export const PostInfoLabel = styled.label`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.6rem;
  color: #9C9C9C;
`;
