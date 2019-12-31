import styled from 'styled-components';

export const HeaderContainer = styled.header`
  color: black;
  padding: 0.7rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PageTitle = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: #4c4c4c;

  :hover {
    color: ${props => props.theme.colors.primary};
  }
`;
