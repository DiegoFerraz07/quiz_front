import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Div = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .auth-section {
    width: 100%;
    margin-top: auto;
    padding: 10px;
    text-align: end;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    word-spacing: 0.05em;
    color: ${colors.primaryColorDark};
    text-align: justify;
    font-family: 'Arial', sans-serif;
  }

  h2 {
    text-align: start;
    width: 100%;
  }

  ul {
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    list-style-type: disc;
    color: ${colors.primaryColorDark};
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.6;
  }

  ul li {
    margin-bottom: 10px;
  }
`;
