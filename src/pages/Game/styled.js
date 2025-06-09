import styled from 'styled-components';
import * as colors from '../../config/colors';

export const FormStyles = styled.div`
  width: 100%;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  h4 {
    color: ${colors.primaryColorDark};
    text-align: start;
  }

  p {
    color: ${colors.primaryColorDark};
    font-weight: 700;
    text-align: start;
  }

  .description {
    margin: 5px 0 5px 15px;
    color: ${colors.primarySubColorDark};
    font-weight: 500;
    text-align: start;
    display: block; /* ✅ Faz o text-align funcionar */
  }

  .question {
    margin: 8px 0 8px 0px;
    color: ${colors.primarySubColorDark};
    font-weight: 600;
    text-align: start;
    display: block; /* ✅ Faz o text-align funcionar */
  }

  input,
  textarea {
    width: 100%;
    padding: 8px 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }

  label {
    display: block;
    color: ${colors.primaryColorDark};
    font-weight: 700;
    margin-bottom: 4px;
    text-align: start;
  }
`;

export const DivGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinha no início */
  align-items: center;
  gap: 8px;
  margin: 10px 0 10px 0;

  input[type='radio'] {
    margin: 10;
    transform: scale(1.2);
    cursor: pointer;
  }

  label {
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${colors.primaryColorDark};
    font-weight: 700;
  }
`;

export const List = styled.div`
  ul {
    margin: 10px 0 10px 0;
    width: 100%;
    max-width: 600px;
    padding-left: 25px;
    list-style-type: disc;
    color: ${colors.primarySubColorDark};
    font-weight: 500;
    line-height: 1.6;
  }

  ul li {
    margin-bottom: 5px;
    text-align: start;
  }
`;
