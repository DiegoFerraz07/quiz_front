import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 580px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: 580px;
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
`;
