import { IoEnterOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import styled from 'styled-components';

export default function InscriptionButton({ activityInfo }) {
  const { capacity } = activityInfo;
  const { Inscription: inscriptions } = activityInfo;
  const remaining = capacity - inscriptions.length;

  return (
    <Container>
      {remaining > 0 ?
        <>
          <IoEnterOutline fontSize={'35px'} color={'#078632'}/>
          <p>{remaining} vagas</p>
        </>
        : 
        <MdCancel fontSize={'35px'}/>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p{
    font-size: 12px;
    color: #078632
  }
`;
