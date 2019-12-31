import styled from 'styled-components';


export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const UsernameText = styled.p`
  background-color: white;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  padding: 5px 15px;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  cursor: default;
  transition:  0.1s ease-in;

  &:hover {
    transition: 0.1s ease-out;
    color: white;
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  text-transform: uppercase;
  outline: none;
  border: none;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  color: #9C9C9C;
  margin-top: 5px;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;