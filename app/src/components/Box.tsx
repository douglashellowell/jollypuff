import { useDroppable } from '@dnd-kit/core';
import './Box.scss';
const makeBoxId = (index: number) => `box-${index}`;

const Box = ({
  index,
  value,
  isDroppable,
  onClick,
}: {
  index: number;
  value: number | null;
  isDroppable: boolean;
  onClick: (index: number) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: makeBoxId(index),
    data: { index },
    disabled: !isDroppable,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    backgroundColor: !isDroppable ? 'pink' : undefined,
    border: !isDroppable ? '4px solid rgb(163, 42, 42)' : undefined,
    fontSize: isOver ? '2em' : '1.4rem',
    fontWeight: isOver ? 'bold' : 'normal',
    transition: 'all 0.5s ease-in-out',
  };
  return (
    <button
      ref={setNodeRef}
      style={style}
      className="box"
      onClick={() => onClick(index)}
      disabled={!isDroppable}
    >
      {value}
    </button>
  );
};

export default Box;
