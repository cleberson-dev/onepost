import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderContainer, PageTitle } from './styles';
import UserInfo from '../UserInfo';
import GuestInfo from '../GuestInfo';
import { AppState } from '../../store';

const Header = () => {
  const currentUser = useSelector((state: AppState) => state.user.data);
  
  return (
    <HeaderContainer>
      <PageTitle href="/">1Post</PageTitle>
      {currentUser.username ? 
        <UserInfo username={currentUser.username} /> 
        : 
        <GuestInfo /> 
      }
    </HeaderContainer>
  );
};

export default Header;
