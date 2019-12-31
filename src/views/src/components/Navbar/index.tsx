import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavbarContainer, NavbarLink } from './styles';

interface NavbarProps {
  links?: { link: string; title: string }[];
}

function Navbar({ links }: NavbarProps) {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <NavbarContainer>
      { 
        links ? links.map(({ link, title }) =>  (
          <NavbarLink
            key={link} 
            to={link}
            active={ pathname === link }
          >
            {title}
          </NavbarLink>
        )) : '' 
      }
    </NavbarContainer>
  );
}

export default Navbar;