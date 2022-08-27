import { useAllQuiz, useQuiz } from "context";
import React from "react";
import { RESET_QUIZ } from "utils";
import { Modal } from "../Modal";

export const FailureModal = () => {
  const { allQuiz } = useAllQuiz();
  const { dispatchQuiz } = useQuiz();

  return (
    <Modal>
      <h2>Oops..! ☹️</h2>
      <p>Time is over.</p>

      <button
        onClick={() =>
          dispatchQuiz({
            type: RESET_QUIZ,
            payload: {
              index: 0,
              data: [...allQuiz[0]],
              turns: 0,
              level: 1,
              score: 0,
              timer: 150,
              isTimerRunning: false,
              isQuizCompleted: false,
            },
          })
        }
      >
        Play again
      </button>
    </Modal>
  );
};
