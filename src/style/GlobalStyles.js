import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

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
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  h2 {
    color: ${colors.primaryColorDark};
    font-size: 30px;
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

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
    transition: all 300ms;
  }

  a:hover {
    filter: brightness(80%);
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success{
    background: ${colors.success};
    color: #fff;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--warning{
    background: ${colors.warning};
    color: #fff;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error{
    background: ${colors.error};
    color: #fff;
  }

  .Toastify__toast-icon svg {
    fill: #fff;

  }
  .Toastify__progress-bar {
  background: white !important;
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
