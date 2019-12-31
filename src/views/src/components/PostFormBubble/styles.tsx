import styled from 'styled-components';

export const PostFormBubbleContainer = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 4fr auto auto;
  grid-template-rows: 4fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 5px;
  justify-items: center;
  align-items: center;
`;

export const PostContentInput = styled.textarea`
  border: none;
  grid-column: 1 / 4;
  justify-self: start;
  align-self: start;
  font-size: 1rem;
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
  resize: none;
  overflow: hidden;
  height: 100%;

  :hover, :focus {
    outline: none;
  }

  ::placeholder {
    font-style: italic;
  }
`;

export const PostLengthCounter = styled.span`
  color: #9C9C9C;
  font-size: 0.8rem;

  grid-column: 2;
`;
