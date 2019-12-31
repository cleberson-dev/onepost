import React from 'react';
import { useHistory } from 'react-router-dom';
import { GuestInfoContainer, ActionButton } from './styles';


const GuestInfo = () => {
  const history = useHistory();
  const { pathname } = history.location;
  
  return (
    <GuestInfoContainer> 
      { pathname === '/login' ? 
        <ActionButton to="/register" children="Registrar" /> 
        : 
        <ActionButton to="/login" children="Login" /> 
      }
    </GuestInfoContainer>
  );
}

export default GuestInfo;