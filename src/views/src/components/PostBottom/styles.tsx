import styled from 'styled-components';

export const PostBottomContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;


export const PostBottomDetailContainer = styled.span<{ cursor: string }>`
  display: flex;
  align-items: flex-end;
  margin-right: 6px;
  background-color: transparent;
  padding: 0;
  border: none;
  font-family: 'Segoe UI', sans-serif;
  cursor: ${props => props.cursor};

  :focus {
    outline: none;
  }
`;

// export const PostBottomDetailIcon = styled.img`
//   height: 1.1rem;
// `;

export const PostBottomDetailIcon = styled.i<{ size?: number }>`
  height: ${props => props.size ? `${props.size}rem` : '1rem'};
  width: ${props => props.size ? `${props.size}rem` : '1rem'};
  
  & > svg {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`;

export const PostBottomDetailText = styled.span`
  color: ${props => props.color};
  font-size: 0.7rem;
  margin-left: 3px;
`;