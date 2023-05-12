import { useHotel } from '../../../hooks/api/useHotel.js';
import react, { useState } from 'react';
import CardHotel from './CardHotel.js';
import styled from 'styled-components';
import CardRoom from './CardRoom.js';

export default function ContainerChoiceHotel() {
  const hotels = useHotel();
  const [selectedHotelRooms, setSelectedHotelRooms] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  return (
    <>
      <HotelList>
        {hotels &&
          hotels.map((hotel) => (
            <CardHotel
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              image={hotel.image}
              setSelectedHotelRooms={setSelectedHotelRooms}
              setSelectedHotelId={setSelectedHotelId}
              isSelected={selectedHotelId === hotel.id}
            />
          ))}
      </HotelList>
      {selectedHotelRooms && (
        <ContainerRoom>
          <p>Ótima pedida! Agora escolha seu quarto:</p>
          <RoomList>
            {selectedHotelRooms.map((room) => (
              <CardRoom key={room.id} id={room.id} name={room.name} capacity={room.capacity} />
            ))}
          </RoomList>
        </ContainerRoom>
      )}
    </>
  );
}

const HotelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0rem;
`;

const ContainerRoom = styled.div`
  width: 100%;
  height: 100%;
  > p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 1rem;
  }
`;

const RoomList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0rem;
`;
