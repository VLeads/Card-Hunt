import { useAllQuiz, useQuiz } from "context";
import React from "react";
import { RESET_QUIZ } from "utils";
import { Modal } from "../Modal";

export const SuccessModal = () => {
  const { allQuiz } = useAllQuiz();
  const { dispatchQuiz } = useQuiz();

  return (
    <Modal>
      <h2>Wow..! 🥳</h2>
      <p>You have cleared all the rounds.</p>

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
