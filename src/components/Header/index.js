import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaUserPlus,
} from 'react-icons/fa';

import { Nav } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { logoutUser } from '../../store/modules/thunks/userThunks';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const useSelector = useAppSelector;
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const handleLogout = e => {
    e.preventDefault();

    dispatch(logoutUser());

    navigate('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
        Home
      </Link>
      {!isLoggedIn ? (
        <>
          <Link to="/register">
            <FaUserPlus size={24} />
            Cadastre-se
          </Link>
          <Link to="/login">
            <FaSignInAlt size={24} />
            Entrar
          </Link>
        </>
      ) : (
        <>
          <Link to="/register">
            <FaUserCircle size={24} />
            Perfil
          </Link>
          <Link onClick={handleLogout} to="/logout">
            <FaSignOutAlt size={24} />
            Sair
          </Link>
        </>
      )}
    </Nav>
  );
}
