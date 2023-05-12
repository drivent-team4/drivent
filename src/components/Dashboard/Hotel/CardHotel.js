import react from 'react';
import styled from 'styled-components';
import { useHotelRooms } from '../../../hooks/api/useHotelRooms.js';
import { useBookingInfos } from '../../../hooks/api/useBookingInfos.js';

export default function CardHotel({ id, name, image }) {
  const hotelRooms = useHotelRooms(id);
  const bookingInfos = useBookingInfos(id);

  const roomTypesAvailable = getRoomTypesAvailable(hotelRooms);
  const totalFreeRooms = calculateTotalFreeRooms(hotelRooms, bookingInfos);

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

function getRoomTypesAvailable(hotelRooms) {
  const capacities = hotelRooms.map((room) => room.capacity);
  const availableTypes = [];

  if (capacities.includes(1)) availableTypes.push('Single');
  if (capacities.includes(2)) availableTypes.push('Double');
  if (capacities.includes(3)) availableTypes.push('Triple');

  if (availableTypes.length === 1) return availableTypes[0];
  if (availableTypes.length === 2) return `${availableTypes[0]} e ${availableTypes[1]}`;

  const lastType = availableTypes.pop();
  return `${availableTypes.join(', ')} e ${lastType}`;
}

function calculateTotalFreeRooms(hotelRooms, bookingInfos) {
  if (!hotelRooms || !bookingInfos) return 0;

  const totalRoomCapacity = hotelRooms.reduce((total, room) => total + room.capacity, 0);
  const totalBookedGuests = bookingInfos.reduce((total, bookingInfo) => total + bookingInfo.guests, 0);

  return totalRoomCapacity - totalBookedGuests;
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
