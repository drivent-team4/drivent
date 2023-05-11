import { useHotel } from '../../../hooks/api/useHotel.js';
import CardHotel from './CardHotel.js';
import styled from 'styled-components';

export default function ContainerChoiceHotel() {
  const hotels = useHotel();

  return (
    <>
      <CardList>
        {hotels &&
          hotels.map((hotel) => (
            <CardHotel key={hotel.id} id={hotel.id} name={hotel.name} image={hotel.image} />
          ))}
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
