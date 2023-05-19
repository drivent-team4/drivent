import { User } from '@phosphor-icons/react';
import styled from 'styled-components';

export default function CardRoom({ id, name, capacity, guests, setSelectedRoomId, isSelected }) {
  const renderIcons = () => {
    const icons = [];
    for (let i = 0; i < capacity; i++) {
      const isFullyBooked = guests >= i + 1;
      const isLastIcon = i === capacity - 1;
      const iconColor = isSelected && isLastIcon ? '#FF4791' : 'inherit';
      const weight = (isSelected && isLastIcon) || isFullyBooked ? 'fill' : 'bold';
      icons.push(<User size={22} color={iconColor} weight={weight} key={i} />);
    }
    return icons;
  };

  const handleClick = () => {
    if (!isSelected && guests < capacity) {
      setSelectedRoomId(id);
    }
  };
 
  return (
    <Card isSelected={isSelected} onClick={handleClick} disabled={guests === capacity}>
      {name}
      <div>{renderIcons()}</div>
    </Card>
  );
}

const Card = styled.button`
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

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #CECECE;
    :active {
    scale: 1;
  }
  }
`;
