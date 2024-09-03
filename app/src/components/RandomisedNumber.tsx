import { useSpring, animated } from '@react-spring/web';
import { useDraggable } from '@dnd-kit/core';
import './RandomisedNumber.scss';

const RandomisedNumber = ({
  num,
  prevNum,

  onGenerateNumEnd,
}: {
  num: number;
  prevNum: number;
  onGenerateNumEnd: () => void;
}) => {
  const spring = useSpring({
    from: { number: prevNum },
    to: { number: num },
    config: { duration: 1000 },

    onRest: () => onGenerateNumEnd(),
  });
  const { attributes, setNodeRef, listeners, transform } = useDraggable({
    id: `randomised-number-${num}`,
    data: { num },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rngNum-${num} rngNum`}
      id={num === 69 ? 'nice-lol' : ''}
    >
      <animated.p>{spring.number.to((n) => n.toFixed(0))}</animated.p>
    </div>
  );
};

export default RandomisedNumber;
