import styled from 'styled-components';



interface DividerProps {
  width?: number;
}

export const Divider = styled.div<DividerProps>`
  width: ${props => props.width ? props.width : '100%' };
  margin: 0.5rem auto;
  border: 0.5px solid rgba(0,0,0,.1);
`;
