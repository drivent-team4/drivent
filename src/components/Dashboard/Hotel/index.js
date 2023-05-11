import { useEffect, useState } from 'react';
import { useHotel } from '../../../hooks/api/useHotel.js';
import CardHotel from './CardHotel.js';
import styled from 'styled-components';

export default function ContainerChoiceHotel() {
  const [hotelList, setHotelList] = useState([]);
  const hotels = useHotel();
  console.log(hotels);
  useEffect(() => {
    if (hotels) {
      setHotelList(hotels);
    }
  }, [hotels]);

  return (
    <>
      <CardList>
        {hotelList && hotelList.map(hotel => (
          <CardHotel ket={hotel.id} id={hotel.id} name={hotel.name} image={hotel.image} />
        )) }
      </CardList>
    </>
  );
}

const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0rem;
`;
