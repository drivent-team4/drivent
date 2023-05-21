import react, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CardReservation from '../Hotel/CardReservation.js';
import styled from 'styled-components';
import useGetUserBookingInfoWithHotel from '../../../hooks/api/useGetUserBookingInfoWithHotel.js';

export default function ReservationSummary() {
  const { userBookingInfoWithHotel, userBookingInfoLoadingWithHotel } = useGetUserBookingInfoWithHotel();
  const [bookingInfo, setBookingInfo] = useState();
  const [hotelInfo, setHotelInfo] = useState();
  const [roomInfo, setRoomInfo] = useState();

  useEffect(() => {
    const fetchBooking = async() => {
      if (userBookingInfoWithHotel) {
        const bookingData = await userBookingInfoWithHotel.Room;
        console.log(bookingData);
        setBookingInfo(bookingData);
        setHotelInfo(bookingData.Hotel);
      }
    };
    fetchBooking();
  }, [userBookingInfoLoadingWithHotel]);

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
