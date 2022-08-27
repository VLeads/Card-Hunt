import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useQuiz } from "context";
import { Card } from "components";
import {
  DECREASE_TIME,
  INCREASE_SCORE,
  INCREASE_TURN,
  RUN_TIMER,
  shuffle,
  STOP_TIMER,
} from "utils";
import { SuccessModal } from "components/modal/successModal/SuccessModal";
import { FailureModal } from "components/modal/failureModal/FailureModal";

export const Quiz = () => {
  const { quiz, dispatchQuiz } = useQuiz();

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({
    first: null,
    second: null,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setCards(() =>
      shuffle([
        ...quiz.data.map((el) => ({
          ...el,
          occurence: 1,
          isMatched: false,
        })),
        ...quiz.data.map((el) => ({
          ...el,
          occurence: 2,
          isMatched: false,
        })),
      ])
    );

    dispatchQuiz({ type: STOP_TIMER });
    setIsDisabled(true);

    const timer1 = setTimeout(
      () =>
        setCards((data) => data.map((card) => ({ ...card, isMatched: true }))),
      1000
    );
    // const timer1 = setTimeout(
    //   () => setCards((card) => ({ ...card, isMatched: true })),
    //   1000
    // );

    const timer2 = setTimeout(() => {
      setCards((data) => data.map((card) => ({ ...card, isMatched: false })));
      setIsDisabled(false);
      dispatchQuiz({ type: RUN_TIMER });
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [quiz.data, dispatchQuiz]);

  // console.log("cards", cards);

  const handleCardClick = (card) => {
    selectedCard.first
      ? setSelectedCard({ ...selectedCard, second: card })
      : setSelectedCard({ ...selectedCard, first: card });
  };

  useEffect(() => {
    let timer1, timer2;
    if (selectedCard.first && selectedCard.second) {
      setIsDisabled(true);
      const resetTurn = () => {
        setSelectedCard({ ...selectedCard, first: null, second: null });
        setIsDisabled(false);
        dispatchQuiz({ type: INCREASE_TURN });
      };

      if (selectedCard.first.id === selectedCard.second.id) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === selectedCard.first.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        timer1 = setTimeout(() => {
          resetTurn();
          dispatchQuiz({ type: INCREASE_SCORE });
        }, 1000);
      } else {
        timer2 = setTimeout(() => resetTurn(), 1000);
      }
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [selectedCard, dispatchQuiz]);

  return (
    <div className="quiz">
      <div className="cards">
        {cards?.map((card) => (
          <Card
            key={card.id + card.occurence}
            card={card}
            handleCardClick={handleCardClick}
            flipped={
              (card.id === selectedCard.first?.id &&
                card.occurence === selectedCard.first?.occurence) ||
              (card.id === selectedCard.second?.id &&
                card.occurence === selectedCard.second?.occurence) ||
              card.isMatched
            }
            isDisabled={isDisabled}
          />
        ))}
        {quiz.isQuizCompleted && <SuccessModal />}
        {quiz.timer === 0 && <FailureModal />}
      </div>
    </div>
  );
};
