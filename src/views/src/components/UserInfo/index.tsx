import React from 'react';
import { UsernameText, UserInfoContainer, LogoutButton } from './styles';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/user/actions';

interface UserInfoProps {
  username: string;
}

function UserInfo({ username }: UserInfoProps) {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = () => {
    dispatch(logoutUser());
  }

  return (
    <UserInfoContainer>
      <UsernameText children={username} />
      <LogoutButton children="Sair" onClick={handleLogoutButtonClick} />
    </UserInfoContainer>
  );
}

export default UserInfo;