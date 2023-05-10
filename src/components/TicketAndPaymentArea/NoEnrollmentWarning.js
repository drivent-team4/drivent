import styled from 'styled-components';

export default function NoEnrollmentWarning() {
  return (
    <StyledWarning>
      <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso.</p>
    </StyledWarning>
  );
}

const StyledWarning = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto;
    font-size: 20px;
    color: #8e8e8e;
    text-align: center;
`;
