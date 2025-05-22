import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Nav = styled.nav`
  background: ${colors.primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    color: #fff;
    margin: 0 12px 0 0;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
    text-decoration: none;
  }

  a:first {
    margin-right: auto;
  }
`;
