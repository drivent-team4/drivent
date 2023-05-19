import { useHotel } from '../../../hooks/api/useHotel.js';
import { toast } from 'react-toastify';
import react, { useState } from 'react';
import CardHotel from './CardHotel.js';
import styled from 'styled-components';
import CardRoom from './CardRoom.js';
import { postBooking } from '../../../services/bookingApi.js';
import useToken from '../../../hooks/useToken.js';
import useChangeRoom from '../../../hooks/api/useChangeRoom.js';

export default function ContainerChoiceHotel({ changingMode, setIsReserved, bookingId, setChangingMode }) {
  const token = useToken();
  const hotels = useHotel();
  const { changeRoom } = useChangeRoom();
  const [selectedHotelRooms, setSelectedHotelRooms] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleClick = async() => {
    try {
      if(!changingMode) {
        await postBooking(token, selectedRoomId);
        toast('Quarto reservado com sucesso!');
        setIsReserved(true);
      }
      if(changingMode) {
        await changeRoom(bookingId, selectedRoomId);
        toast('Quarto trocado com sucesso!');
        setChangingMode(false);
      }
    } catch (error) {
      toast('Não foi possível reservar o quarto!');
    }
  };

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
              setSelectedRoomId={setSelectedRoomId}
              isSelected={selectedHotelId === hotel.id}
            />
          ))}
      </HotelList>
      {selectedHotelRooms && (
        <ContainerRoom>
          <p>Ótima pedida! Agora escolha seu quarto:</p>
          <RoomList>
            {selectedHotelRooms.map((room) => (
              <CardRoom
                key={room.id}
                id={room.id}
                name={room.name}
                capacity={room.capacity}
                guests={room.Booking.length}
                setSelectedRoomId={setSelectedRoomId}
                isSelected={selectedRoomId === room.id}
              />
            ))}
          </RoomList>
          {selectedRoomId && <Button onClick={handleClick}>RESERVAR QUARTO</Button>}
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

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;

  :hover {
    opacity: 0.6;
  }
  :active {
    scale: 0.9;
  }
`;
