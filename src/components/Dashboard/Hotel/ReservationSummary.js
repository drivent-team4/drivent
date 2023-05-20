import react, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CardReservation from '../Hotel/CardReservation.js';
import styled from 'styled-components';
import useGetUserBookingInfo from '../../../hooks/api/useGetUserBookingInfo.js';
import { useHotelByRoomId } from '../../../hooks/api/useHotel.js';
import { useRoomById } from '../../../hooks/api/useRoom.js';

export default function ReservationSummary() {
  const { userBookingInfo, userBookingInfoLoading } = useGetUserBookingInfo();
  const [booking, setBooking] = useState();
  const [hotel, setHotel] = useState();
  const [room, setRoom] = useState();

  return (
    <>
      <ContainerHotel>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <p>Você já escolheu seu quarto: </p>
        <HotelList>
          <CardReservation
            image="https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg"
            hotelName="Teste"
            roomName="455"
            capacity="3"
            guests="2"
          />
        </HotelList>
      </ContainerHotel>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const HotelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0rem;
`;

const ContainerHotel = styled.div`
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
