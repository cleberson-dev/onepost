import styled from 'styled-components';

export const InputBoxContainer = styled.input`
  padding:  0.5rem 0.8rem;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.color ? props.color : '#ECECEC'};
  border-radius: 4px;
  font-family: 'Segoe UI', sans-serif;
  margin-top: 5px;
  width: 100%;

  :hover, :focus { outline: none; }

  :focus {
    border-color: ${props => props.theme.colors.primary};
    transition: 0.2s;
  }
`;