import react, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CardReservation from '../Hotel/CardReservation.js';
import styled from 'styled-components';
import useGetUserBookingInfo from '../../../hooks/api/useGetUserBookingInfo.js';
import { useHotel } from '../../../hooks/api/useHotel.js';

export default function ReservationSummary() {
  const booking = useGetUserBookingInfo();
  const hotel = useHotel();
  console.log(hotel);

  return (
    <>
      <ContainerHotel>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <p>Você já escolheu seu quarto: </p>
        <HotelList>
          <CardReservation
            id={booking.id}
            image={hotel.image}
            hotelName={hotel.name}
            roomName={booking.Room.name}
            capacity={booking.Room.capacity}
            guests={booking.length}
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
