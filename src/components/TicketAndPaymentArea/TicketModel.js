import styled from 'styled-components';

export const ChosenTicketInfo = styled.div`
  width: 145px;
  height: 145px;
  border: ${props => props.chosen ? 'none' : '1px solid #CECECE'};
  border-radius: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  color: #454545;
  background-color: ${props => props.chosen ? '#FFEED2' : '#E5E5E5'};
> p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400px;
  color: #898989;
  font-family: "Roboto", sans-serif;
}
`;
