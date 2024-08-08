import Image from 'next/image';
import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
  {
    name: 'QR Code',
    url: '/test/testQr.png',
  },
];

export const ReactTinderCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    console.log('swiped: ', direction, nameToDelete, index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  /** フレームアウト時 */
  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    alert('TODO API call');
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className='cardContainer'>
      {db.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          className='swipe'
          preventSwipe={['right', 'left', 'down']}
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name, index)}
          onCardLeftScreen={() => outOfFrame(character.name, index)}
        >
          <div className='card'>
            <Image
              src={character.url}
              alt={character.name}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
        </TinderCard>
      ))}

      {/*{lastDirection ? (*/}
      {/*  <h2 key={lastDirection} className='infoText'>*/}
      {/*    You swiped {lastDirection}*/}
      {/*  </h2>*/}
      {/*) : (*/}
      {/*  <h2 className='infoText'>*/}
      {/*    Swipe a card or press a button to get Restore Card button visible!*/}
      {/*  </h2>*/}
      {/*)}*/}
      <style jsx>{`
        .cardContainer {
          display: flex;
          justify-content: center;
          margin-top: 50px;
        }

        .swipe {
          position: absolute;
        }

        .card {
          position: relative;
          width: 300px;
          height: 300px;
          background-color: #fff;
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          box-shadow: 0px 18px 53px -5px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card h3 {
          margin-bottom: 10px;
          color: #fff;
        }

        .buttons {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .buttons button {
          background-color: #ff8c00;
          border: none;
          color: white;
          padding: 15px 25px;
          margin: 0 10px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .buttons button:disabled {
          background-color: #c3c4d3;
          cursor: not-allowed;
        }

        .infoText {
          text-align: center;
          margin-top: 30px;
          font-size: 20px;
          color: #ff8c00;
        }
      `}</style>
    </div>
  );
};

export default ReactTinderCard;
