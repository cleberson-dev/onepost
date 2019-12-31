import styled from 'styled-components';

export const IconTextContainer = styled.div`
  display: flex;
  margin: 5px 0;
  align-items: center;
`;


export const IconTextIcon = styled.img`
  height: 1.4rem;
`;

export const IconTextText = styled.span`
  color: ${props => props.color ? props.color : '#9C9C9C'};
  font-size: 0.8rem;
  margin-left: 3px;
`;