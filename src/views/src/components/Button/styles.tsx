import styled from 'styled-components';

export const ButtonContainer = styled.button<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  font-size: ${props => `${props.size}rem`};
  font-weight: bold;
  font-family: 'Segoe UI', sans-serif;
  text-transform: uppercase;
  width: 100%;
  padding: 0.75rem 2rem;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;