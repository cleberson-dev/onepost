import styled from 'styled-components';

export const HomeContainer = styled.main`

`;

export const NoPostsContainer = styled.main`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-transform: lowercase;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;