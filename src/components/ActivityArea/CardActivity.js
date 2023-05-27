import { IoEnterOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { useInscriptionPost } from '../../hooks/api/useInscription';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';

const CardActivity = ({ activityInfo }) => {
  const { capacity } = activityInfo;
  const { Inscription: inscriptions } = activityInfo;
  const remaining = capacity - inscriptions.length;
  const { act } = useInscriptionPost();
  const [isConfirming, setIsConfirming] = useState(false);

  const {
    userData: {
      user: { id: userId },
    },
  } = useContext(UserContext);
  let hasConfirmed = false;
  for (let i in inscriptions) {
    if (inscriptions[i].userId === userId) hasConfirmed = true;
  }

  async function handleClick() {
    try {
      await act(activityInfo.id);
      toast('Inscrição realizada!');
      setIsConfirming(false);
    } catch (error) {
      toast('Não foi possivel realizar a inscrição');
      console.log(error);
    }
  }
  return (
    <>
      <CardAnimation>
        <CardActivityContainer>
          <CardActivityContent>
            <CardActivityTitle>Minecraft: montando o PC ideal</CardActivityTitle>
            <CardActivityTime>09:00 - 10:00</CardActivityTime>
          </CardActivityContent>
          <CardLineDiv />
          {hasConfirmed ? (
            <div>
              <Container hasSeats={true}>
                <AiOutlineCheckCircle fontSize={'35px'} />
                <p>Inscrito!</p>
              </Container>
            </div>
          ) : remaining > 0 ? (
            <div onClick={() => setIsConfirming(true)}>
              <Container hasSeats={true}>
                <IoEnterOutline fontSize={'35px'} />
                <p>{remaining} vagas</p>
              </Container>
            </div>
          ) : (
            <div>
              <Container hasSeats={false}>
                <MdCancel fontSize={'35px'} />
                <p>Esgotado!</p>
              </Container>
            </div>
          )}
        </CardActivityContainer>
        <ConfirmAction isConfirming={isConfirming}>
          <p>Quer confirmar sua inscrição?</p>
          <div>
            <button onClick={() => setIsConfirming(false)}>Não</button>
            <button onClick={handleClick}>Sim</button>
          </div>
        </ConfirmAction>
      </CardAnimation>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.hasSeats ? '#078632' : '#CC6666')};

  p {
    font-size: 12px;
  }
`;

export default CardActivity;

const CardAnimation = styled.div`
  position: relative;
  overflow: hidden;
  width: 265px;
  height: 80px;
`;

const CardActivityContainer = styled.div`
  width: 265px;
  padding: 12px 10px;
  border-radius: 5px;
  background-color: #f1f1f1;
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
  background-color: #cfcfcf;
`;

const ConfirmAction = styled.div`
  position: absolute;
  top: 0px;
  right: ${(props) => (props.isConfirming ? '0px' : '-265px')};
  width: 265px;
  padding: 12px 10px 12px 10px;
  border-radius: 5px;
  background-color: #f1f1f1;
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
    background-color: #ffd180;
    color: #fff;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
    &:last-of-type {
      background-color: #fb4398;
    }
  }
`;
