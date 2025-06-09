import styled from 'styled-components';
import * as colors from '../../config/colors';

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  color: ${colors.primaryColorDark};
  border-radius: 7px;
  width: 480px;
  font-weight: bold;
  background-color: #f3f4f6;
  margin-bottom: 8px;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: 480px;
  font-weight: 540;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    filter: brightness(90%);
  }

  &:last-child {
    background-color: ${colors.success};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  button {
    padding: 6px 10px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: 300ms;

    &:hover {
      filter: brightness(90%);
    }

    &:first-child {
      background-color: ${colors.warning};
    }

    &:last-child {
      background-color: ${colors.error};
    }
  }
`;
