import styled from 'styled-components';

export const FABContainer = styled.button<{ size: number; active: boolean; }>`
  border-radius: 999px;
  background-color: ${props => props.theme.colors.primary};
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  height: ${props => `calc(3rem * ${props.size})`};
  width: ${props => `calc(3rem * ${props.size})`};
  border: none;
  outline: none;
  opacity: ${props => props.active ? '1' : '0.5'};
  cursor: ${props => props.active ? 'pointer': 'not-allowed' };

  :hover { opacity: 0.6; }
`;