import styled from 'styled-components';

export const ErrorAlertContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const ErrorAlertMessage = styled.span`
  color: ${props => props.theme.colors.alert};
  margin-left: 3px;
  font-size: 0.9rem;
`;