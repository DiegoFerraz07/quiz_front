import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  h1 {
    color: ${colors.primaryColorDark};
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: bold;
  }

  button {
    cursor: pointer;
    color: #fff;
    background-color: ${colors.primaryColor};
    padding: 10px 20px;
    border-radius: 4px;
    border-width: 1px;
    font-weight: 700;
    transition: all 300ms;
  }

  button:hover {
    filter: brightness(90%);
  }

  html, body, #root {
    height: 100%;
  }

`;

export const Container = styled.div`
  max-width: 680px;
  background: #f3f4f6;
  margin: 30px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;
