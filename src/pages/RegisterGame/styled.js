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
  margin-bottom: 16px;

  input[type='checkbox'] {
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

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .choice {
    display: flex;
    align-items: center;
    gap: 12px;

    input[type='text'] {
      flex: 1;
    }

    label {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
    }
  }
`;
