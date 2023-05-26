import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

const CardActivityDay = ({ startDay, activities }) => {
  const formattedDay = dayjs(startDay).locale('pt-br').format('dddd, DD/MM').replace('-feira', '');

  return <CardDay>{formattedDay}</CardDay>;
};

export default CardActivityDay;

const CardDay = styled.div`
  width: 131px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;

  :hover {
    opacity: 0.7;
  }
  :active {
    scale: 0.95;
  }
`;
