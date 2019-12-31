import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GuestInfoContainer = styled.div`

`;

export const ActionButton = styled(Link)`
  text-decoration: none;
  text-transform: lowercase;
  font-weight: 600;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  transition: 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: white;

    transition: 0.2s ease;
  }
`;