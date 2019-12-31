import styled from 'styled-components';



export const CardContainer = styled.div<{ padding?: string }>`
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .16);
  background-color: white;
  width: 100%;
  height: 100%;

  padding: ${props => props.padding ? props.padding : ''};
`;