import styled from 'styled-components';

export default function CardReservation({
  image,
  hotelName,
  roomName,
  guests
}) 
{
  return (
    <Card>
      <img src={image} alt="ilustração do hotel" />
      <h3>{hotelName}</h3>
      <CardInfo>
        Quarto reservado:
        <p>{roomName}</p>
        {/*         Pessoas no seu quarto:
        <p>{(guests > 1) ? `Você e mais ${guests-1}` : 'Só você!'} </p> */}
      </CardInfo>
    </Card>
  );
}

const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 1.5rem;
  cursor: pointer;

  width: 196px;
  height: 264px;
  background: #FFEED2;
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

  :hover {
    opacity: 0.6;
  }
  :active {
    scale: 0.95;
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
