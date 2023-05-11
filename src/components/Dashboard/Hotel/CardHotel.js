import react from 'react';
import styled from 'styled-components';

export default function CardHotel(props) {
  const { id, name, image } = props;
  return (
    <Card>
      <img src={image} alt="ilustração do hotel" />
      <h3>{name}</h3>
      <CardInfo>
        <p>Tipos de acomodação:</p>
        Single e Double
        <p>Vagas disponíveis:</p>
        103
      </CardInfo>
    </Card>
  );
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
  gap: 0.3rem;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;

  p {
    font-weight: 700;
  }
`;
