import { useActivity } from '../../hooks/api/useActivity.js';
import styled from 'styled-components';
import { StyledTypography } from '../TicketAndPaymentArea/index.js';
import CardActivityDay from './CardActivityDay.js';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';
import CardActivity from './CardActivity.js';

export default function ContainerActivity() {
  const activities = useActivity();
  const [cardSelected, setCardSelected] = useState([]);
  const [id1, setId1] = useState([]);
  const [id2, setId2] = useState([]);
  const [id3, setId3] = useState([]);

  const groupedActivities = activities?.reduce((grouped, activity) => {
    const startDay = dayjs(activity.startAt).format('YYYY-MM-DD');
    grouped[startDay] = grouped[startDay] || [];
    grouped[startDay].push(activity);
    return grouped;
  }, {});

  useEffect(() => {
    if (cardSelected.length !== 0) {
      setId1([]);
      setId2([]);
      setId3([]);
      cardSelected.forEach(card => {
        if(card.auditoryId === 1) {
          setId1(prevId => [...prevId, card]);
        } else if(card.auditoryId === 2) {
          setId2(prevId => [...prevId, card]);
        } else {
          setId3(prevId => [...prevId, card]);
        }
      });
    }
  }, [cardSelected]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ContainerChoiceDay>
        {groupedActivities &&
          Object.keys(groupedActivities).map((startDay) => (
            <CardActivityDay key={startDay} startDay={startDay} activities={groupedActivities[startDay]} setCardSelected={setCardSelected} />
          ))}
      </ContainerChoiceDay>
      {(cardSelected.length !== 0) && (
        <ContainerRooms>
          <Room>
            <RoomTitle>Auditório Principal</RoomTitle>
            <RoomActivities>
              {id1.map(act => (
                <CardActivity key={act.id} card={act} />
              ))}
            </RoomActivities>
          </Room>

          <Room>
            <RoomTitle>Auditório Lateral</RoomTitle>
            <RoomActivities>
              {id2.map(act => (
                <CardActivity key={act.id} card={act} />
              ))}
            </RoomActivities>
          </Room>

          <Room>
            <RoomTitle>Sala de Workshop</RoomTitle>
            <RoomActivities>
              {id3.map(act => (
                <CardActivity key={act.id} card={act} />
              ))}
            </RoomActivities>
          </Room>
        </ContainerRooms>
      )}
    </>
  );
}

const ContainerChoiceDay = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContainerRooms = styled.div`
  display: flex;
  margin-top: 25px;
  width: 100%;
  height: 425px;
`;

const Room = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const RoomTitle = styled.p`
  font-size: 17px;
  font-weight: 400;
  color: #7B7B7B;
  font-family: 'Roboto';
  margin-bottom: 7px;
`;

const RoomActivities = styled.div`
  border-top: 1px solid #D7D7D7;
  border-right: 1px solid #D7D7D7;
  border-bottom: 1px solid #D7D7D7;
  border-left: 1px solid #D7D7D7;
  height: 100%;
  width: 100%;
  padding: 10px 9px;
`;
