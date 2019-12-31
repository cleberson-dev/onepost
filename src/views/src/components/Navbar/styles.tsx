import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  background-color: white;
  border-radius: 3px;
  width: fit-content;
  padding: 1rem 3rem 1rem 0;
  z-index: 3;
  position: relative;
  top: 4px;
`;

export const NavbarLink = styled(Link)<{ active?: boolean; }>`
  padding: calc(1rem - 3px) 1.2rem;
  border-bottom-width: '3px';
  border-bottom-style: ${props => props.active ? 'solid' : 'none'};
  border-bottom-color: ${props => props.theme.colors.primary ? props.theme.colors.primary : '#9C9C9C'};
  color: ${props => props.active ? props.theme.colors.primary : '#9C9C9C'};
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  
  :hover {
    border-bottom-style: solid;
    border-bottom-color: ${props => props.active ? props.theme.colors.primary : '#DCDCDC' };
    cursor: ${props => props.active ? 'default' : 'pointer'};
  }
`;