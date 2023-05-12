import styled from 'styled-components';

export const TicketModel = styled.div`
  width: 145px;
  height: 145px;
  border: ${(props) => (props.chosen ? 'none' : '1px solid #CECECE')};
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  color: #454545;
  background-color: ${(props) => (props.chosen ? '#FFEED2' : '#E5E5E5')};
  > p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400px;
    color: #898989;
    font-family: 'Roboto', sans-serif;
  }
`;

export const TicketContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 45px;
`;

export const ReserveButton = styled.button`
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;
