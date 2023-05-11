import react from 'react';
import styled from 'styled-components';
import { useHotelRooms } from '../../../hooks/api/useHotelRooms.js';
import { useBookingInfos } from '../../../hooks/api/useBookingInfos.js';

export default function CardHotel({ id, name, image }) {
  const hotelWithRooms = useHotelRooms(id);
  const bookingInfos = useBookingInfos(id);

  const maxCapacity = hotelWithRooms ? Math.max(...hotelWithRooms.map((room) => room.capacity)) : 0;
  let totalFreeRooms = 0;
  if (hotelWithRooms && bookingInfos) {
    totalFreeRooms =
      hotelWithRooms.reduce((total, room) => total + room.capacity, 0) -
      bookingInfos.reduce((total, bookingInfo) => total + bookingInfo.guests, 0);
  }

  let roomTypesAvailable = 'Single';
  if (maxCapacity === 3) roomTypesAvailable = 'Single, Double e Triple';
  if (maxCapacity === 2) roomTypesAvailable = 'Single, Double';

  return (
    <Card>
      <img src={image} alt="ilustração do hotel" />
      <h3>{name}</h3>
      <CardInfo>
        Tipos de acomodação:
        <p> {roomTypesAvailable}</p>
        Vagas disponíveis:
        <p>{totalFreeRooms}</p>
      </CardInfo>
    </Card>
  );
}

const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;

  width: 196px;
  height: 264px;
  background: #ebebeb;
  border-radius: 10px;

  img {
    height: 50%;
    width: 100%;
  }

  h3 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #343434;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;

  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;

  p {
    font-weight: 400;
    margin-bottom: 0.6rem;
  }
`;
