import styled from 'styled-components';
import Button from '../../components/Button';

export const RegisterContainer = styled.main`
  width: 95%;
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

export const RegisterButton = styled(Button)`
  margin-top: 2rem;
`;