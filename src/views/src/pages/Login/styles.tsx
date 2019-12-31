import styled from 'styled-components';
import Title from '../../components/Title';

export const LoginContainer = styled.main`
  width: 90%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled(Title)`
  margin-bottom: 10rem;
`;