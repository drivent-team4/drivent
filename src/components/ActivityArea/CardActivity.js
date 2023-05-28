import { IoEnterOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { useInscriptionPost } from '../../hooks/api/useInscription';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';

const CardActivity = ({ card }) => {
  const { capacity } = card;
  const { Inscription: inscriptions } = card;
  const remaining = capacity - inscriptions.length;
  const { act } = useInscriptionPost();
  const [isConfirming, setIsConfirming] = useState(false);
  const end = dayjs(card.endAt).locale('pt-br').format('HH:MM');
  const start = dayjs(card.startAt).locale('pt-br').format('HH:MM');
  const size = calcTime();
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
      await act(card.id);
      toast('Inscrição realizada!');
      setIsConfirming(false);
    } catch (error) {
      toast('Não foi possivel realizar a inscrição! Confirme a disponibilidade de vagas e se não há conflitos de horários com inscrições realizadas previamente.');
    }
  }

  function calcTime() {
    const diff =
      Number(dayjs(card.endAt).locale('pt-br').format('HH')) - Number(dayjs(card.startAt).locale('pt-br').format('HH'));

    if (diff === 0) return 1;

    return diff;
  }

  return (
    <>
      {card.length === 0 ? (
        <></>
      ) : (
        <CardAnimation size={size * 80}>
          <CardActivityContainer size={size * 80}>
            <CardActivityContent>
              <CardActivityTitle>{card.name}</CardActivityTitle>
              <CardActivityTime>
                {start} - {end}
              </CardActivityTime>
            </CardActivityContent>
            <CardLineDiv />
            {hasConfirmed ? (
              <Container hasSeats={true}>
                <div>
                  <AiOutlineCheckCircle fontSize={'35px'} />
                  <p>Inscrito!</p>
                </div>
              </Container>
            ) : remaining > 0 ? (
              <Container hasSeats={true}>
                <div onClick={() => setIsConfirming(true)}>
                  <IoEnterOutline fontSize={'35px'} />
                  <p>{remaining} vagas</p>
                </div>
              </Container>
            ) : (
              <Container hasSeats={false}>
                <div>
                  <MdCancel fontSize={'35px'} />
                  <p>Esgotado!</p>
                </div>
              </Container>
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
      )}
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
  width: 100%;
  height: ${(props) => `${props.size}px`};
  margin: 0 0 12px 0;
`;

const CardActivityContainer = styled.div`
  width: 100%;
  padding: 12px 10px;
  border-radius: 5px;
  background-color: #f1f1f1;
  height: ${(props) => `${props.size}px`};
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
