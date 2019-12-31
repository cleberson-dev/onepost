import styled from 'styled-components';

export const IconButtonContainer = styled.button<{ size: number }>`
  width: ${props => props.size ? `calc(24px * ${props.size})` : '24px'};
  height: ${props => props.size ? `calc(24px * ${props.size})` : '24px'};
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export const IconButtonIcon = styled.img`
  
`;