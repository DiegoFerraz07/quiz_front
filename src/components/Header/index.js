import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa';

import { Nav } from './styled';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/">
        <FaUserCircle size={24} />
      </Link>
      <Link to="/">
        <FaSignInAlt size={24} />
      </Link>
      <Link to="/">
        <FaSignOutAlt size={24} />
      </Link>
    </Nav>
  );
}
