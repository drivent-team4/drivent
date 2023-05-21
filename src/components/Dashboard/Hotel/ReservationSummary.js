import react, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CardReservation from '../Hotel/CardReservation.js';
import styled from 'styled-components';
import useGetUserBookingInfo from '../../../hooks/api/useGetUserBookingInfo.js';
import { fetchBookingCount } from '../../../hooks/api/useBookingInfos.js';

export default function ReservationSummary() {
  const { userBookingInfo, userBookingInfoLoading } = useGetUserBookingInfo();
  const [bookingInfo, setBookingInfo] = useState();
  const [hotelInfo, setHotelInfo] = useState();
  const [roomInfo, setRoomInfo] = useState();

  useEffect(() => {
    const fetchBooking = async() => {
      if (userBookingInfo) {
        const bookingData = await userBookingInfo.Room;
        setBookingInfo(bookingData);
        setHotelInfo(bookingData.Hotel);
      }
    };
    fetchBooking();
  }, [userBookingInfoLoading]);

  return (
    <>
      <ContainerHotel>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <p>Você já escolheu seu quarto: </p>
        <HotelList>
          {bookingInfo && hotelInfo && (<CardReservation
            image={hotelInfo.image}
            hotelName={hotelInfo.name}
            roomName={bookingInfo.name}
            guests="3"
          />)}
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
