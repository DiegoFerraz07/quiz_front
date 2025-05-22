import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  label {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.primaryColorDark};
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  input[type='radio'] {
    display: flex;
    gap: 10px;
    width: 16px;
    height: 16px;
    margin: 0;
  }
`;
