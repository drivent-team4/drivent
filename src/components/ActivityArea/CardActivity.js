import { useState } from 'react';
import styled from 'styled-components';

const CardActivity = ({ card }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  function selectCard() {
    setIsConfirming(!isConfirming);
  }

  return (
    <>
      {card.length === 0 ?
        <></> :
        <CardAnimation>
          <CardActivityContainer>
            <CardActivityContent>
              <CardActivityTitle>{card[0].name}</CardActivityTitle>
              <CardActivityTime>09:00 - 10:00</CardActivityTime>
            </CardActivityContent>
            <CardLineDiv />
            <button onClick={() => selectCard()}>SELECT</button>
          </CardActivityContainer>
          <ConfirmAction isConfirming={isConfirming}>
            <p>Quer confirmar sua inscrição?</p>
            <div>
              <button onClick={() => selectCard()}>Não</button>
              <button onClick={() => selectCard()}>Sim</button>
            </div>
          </ConfirmAction>
        </CardAnimation>
      }
    </>
  );
};

export default CardActivity;

const CardAnimation = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 80px;
`;

const CardActivityContainer = styled.div`
  width: 100%;
  padding: 12px 10px;
  border-radius: 5px;
  background-color: #F1F1F1;
  height: 80px;
  display: flex;
  justify-content: space-between;
  transition: all 1s ease;
`;

const CardActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 172px;
`;

const CardActivityTitle = styled.p`
  font-size: 12px;
  font-family: 'Roboto';
  font-weight: 700;
  color: #343434;
  margin-bottom: 6px;
`;

const CardActivityTime = styled.p`
  font-size: 12px;
  font-family: 'Roboto';
  font-weight: 400;
  color: #343434;
`;

const CardLineDiv = styled.div`
  height: 100%;
  width: 1px;
  background-color: #CFCFCF;
`;

const ConfirmAction = styled.div`
  position: absolute;
  top: 0px;
  right: ${props => props.isConfirming ? '0px':'-265px'};
  width: 265px;
  padding: 12px 10px 12px 10px;
  border-radius: 5px;
  background-color: #F1F1F1;
  height: 80px;
  
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 16px;
    color: #000;
    font-family: 'Roboto';
    font-weight: 500;
    text-align: center;
  }
  div {
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    display: flex;
    gap: 5%;
  }
  button {
    border-radius: 5px;
    width: 50%;
    height: 28px;
    border: none;
    background-color: #FFD180;
    color: #FFF;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
    &:last-of-type {
      background-color: #FB4398;
    }
  }
`;
