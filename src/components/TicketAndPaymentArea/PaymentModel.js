import styled from 'styled-components';

const PayedContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 14px;
`;

const PayedTextBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const PayedTextTitle = styled.h3`
    font-weight: 700;
    color: #454545;
    font-family: 'Roboto', sans-serif;
`;

const PayedText = styled.p`
    color: #454545;
    font-family: 'Roboto', sans-serif;
`;

export {
  PayedContainer,
  PayedTextBox,
  PayedTextTitle,
  PayedText,
};

