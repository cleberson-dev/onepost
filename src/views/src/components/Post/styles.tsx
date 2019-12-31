import styled from 'styled-components';

export const PostContainer = styled.article`
  position: relative;
  box-sizing: border-box;
  padding: 1.5rem 1rem;

  :hover {
    background-color: #F8F8F8;
  }
`;

export const PostContent = styled.p`
  line-height: 1.2rem;
  letter-spacing: 0.5px;
  text-align: left;
  font-size: 0.8rem;
`;

export const InfosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
`;

export const PostUsernameInfo = styled.div`
  text-transform: lowercase;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
`;

export const PostLikesInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  color: #9C9C9C;
  font-weight: bold;
  margin-top: 5px;
`;

export const PostLikesInfoIcon = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 2px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & > svg {
    width: 100%;
    height: 100%;
  }

  :focus {
    outline: none;
  }
`;