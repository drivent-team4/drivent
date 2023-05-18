import { User } from '@phosphor-icons/react';
import styled from 'styled-components';

export default function CardRoom({ id, name, capacity, setSelectedRoomId, isSelected }) {
  const renderIcons = () => {
    const icons = [];
    for (let i = 0; i < capacity; i++) {
      const iconColor = isSelected && i === capacity -1 ? '#FF4791' : 'inherit';
      const weight = isSelected && i === capacity -1 ? 'fill' : 'bold';
      icons.push(<User size={22} color={iconColor} weight={weight} key={i} />);
    }
    return icons;
  };

  return (
    <Card isSelected={isSelected} onClick={() => setSelectedRoomId(id)}>
      {name}
      <div>{renderIcons()}</div>
    </Card>
  );
}

const Card = styled.li`
  width: 190px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : '#ffffff')};

  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #454545;
  cursor: pointer;

  > div {
    display: flex;
    gap: 0.3rem;
  }

  :hover {
    opacity: 0.6;
  }
  :active {
    scale: 0.9;
  }
`;
