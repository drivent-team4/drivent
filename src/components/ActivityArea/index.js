import { useActivity } from '../../hooks/api/useActivity.js';
import styled from 'styled-components';
import { StyledTypography } from '../TicketAndPaymentArea/index.js';
import CardActivityDay from './CardActivityDay.js';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function ContainerActivity() {
  const activities = useActivity();

  const groupedActivities = activities?.reduce((grouped, activity) => {
    const startDay = dayjs(activity.startAt).format('YYYY-MM-DD');
    grouped[startDay] = grouped[startDay] || [];
    grouped[startDay].push(activity);
    return grouped;
  }, {});

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ContainerChoiceDay>
        {groupedActivities &&
          Object.keys(groupedActivities).map((startDay) => (
            <CardActivityDay key={startDay} startDay={startDay} activities={groupedActivities[startDay]} />
          ))}
      </ContainerChoiceDay>
    </>
  );
}

const ContainerChoiceDay = styled.div`
  display: flex;
  gap: 1rem;
`;
