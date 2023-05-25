import { IoEnterOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import styled from 'styled-components';

export default function InscriptionButton({ activityInfo }) {
  console.log(activityInfo);
  const { capacity } = activityInfo;
  const inscriptions = activityInfo.Inscriptions.length;
  const remaining = capacity - inscriptions;

  return <>{remaining > 0 ? <IoEnterOutline /> : <MdCancel />}</>;
}

const ConfirmButton = styled.div`
  width: 40px;
  height: 40px;
`;
