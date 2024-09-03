import { useEffect, useMemo, useState } from 'react';
import './App.scss';
import _ from 'lodash';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Box from './components/Box';
import RandomisedNumber from './components/RandomisedNumber';
import Confetti from 'react-confetti';
import AzureFunctionCaller from './components/AzureFunctionCaller';

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const BOX_COUNT = 10;

const loseMessages = {
  1: 'SO CLOSE',
  2: 'nice!',
  3: 'good',
  4: 'acceptable',
  5: 'okay, sure...',
  6: 'not good',
  7: 'bad',
  8: 'try a different game',
  9: 'You are a disappointment',
};

function App() {
  const [randomisedNumber, setRandomisedNumber] = useState(0);
  const [prevRandomisedNumber, setPrevRandomisedNumber] = useState(0);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [gameState, setGameState] = useState(() =>
    _.times<null | number>(BOX_COUNT, () => null)
  );
  const [availableBoxes, setAvailableBoxes] = useState<boolean[]>(
    _.times(BOX_COUNT, () => false)
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const getRandomNumber = () => {
    let randomNumber;
    do {
      // ensure new random number
      randomNumber = _.random(MIN_NUMBER, MAX_NUMBER);
    } while (generatedNumbers.includes(randomNumber));
    setGeneratedNumbers([...generatedNumbers, randomNumber]);
    setPrevRandomisedNumber(randomisedNumber);
    setRandomisedNumber(randomNumber);
    setIsButtonDisabled(true);
    // setAvailableBoxes(getAvailableBoxes(randomNumber));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const targetBoxIndex =
      event.over?.data.current && event.over.data.current.index;
    const newGameState = [...gameState];
    newGameState[targetBoxIndex] = randomisedNumber;
    setGameState(newGameState);
    setIsButtonDisabled(false);
  };

  const onBoxClick = (index: number) => {
    const newGameState = [...gameState];
    newGameState[index] = randomisedNumber;
    setGameState(newGameState);
    setIsButtonDisabled(false);
  };

  const getAvailableBoxes = (num: number) => {
    const availableBoxes = _.times(gameState.length, (index) => {
      if (typeof gameState[index] === 'number') return false;
      const biggerNumberAtLowerIndex = _.some(gameState, (value, i) => {
        return i < index && value && value > num;
      });
      const smallerNumberAtHigherIndex = _.some(gameState, (value, i) => {
        return i > index && value && value < num;
      });
      return !biggerNumberAtLowerIndex && !smallerNumberAtHigherIndex;
    });
    return availableBoxes;
  };

  useEffect(() => {
    if (_.every(gameState, (box) => typeof box === 'number')) {
      setConfetti(true);
    }
  }, [gameState]);

  const score = useMemo(
    () => _.filter(gameState, _.isNull).length,
    [gameState]
  );

  return (
    <DndContext onDragEnd={onDragEnd}>
      {confetti && (
        <>
          <Confetti />
          <div id="you-win">
            <h2>wow u r cool</h2>
            <button onClick={() => window.location.reload()}>reset</button>
          </div>
        </>
      )}
      {_.every(availableBoxes, (isAvailable) => !isAvailable) && (
        <div id="you-lose">
          <h2>{loseMessages[score as keyof typeof loseMessages]}</h2>
          <p>score: {_.filter(gameState, _.isNull).length}</p>
          <button onClick={() => window.location.reload()}>reset</button>
        </div>
      )}
      <main>
        <section id="box-container">
          <p>low</p>
          {_.map(gameState, (value, index) => (
            <Box
              key={index}
              index={index}
              value={value}
              isDroppable={availableBoxes[index] && randomisedNumber !== 0}
              onClick={onBoxClick}
            />
          ))}
          <p>high</p>
        </section>
        <section id="rng-container">
          <RandomisedNumber
            num={randomisedNumber}
            prevNum={prevRandomisedNumber}
            onGenerateNumEnd={() =>
              setAvailableBoxes(getAvailableBoxes(randomisedNumber))
            }
          />
          <button
            onClick={getRandomNumber}
            disabled={isButtonDisabled}
            style={{ background: gameState.every(_.isNull) ? '#43A32A' : '' }}
          >
            {gameState.every(_.isNull)
              ? 'Start'
              : randomisedNumber === 69
              ? 'Nice'
              : 'Get'}
          </button>
          {/* <ul>
            <li>get random number</li>
            <li>drag or click</li>
            <li>try to fill all boxes in numerical order</li>
            </ul> */}
          <AzureFunctionCaller />
        </section>
      </main>
    </DndContext>
  );
}

export default App;
