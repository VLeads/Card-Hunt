import { CardFlipData } from "data";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

const AllQuizContext = createContext();

const AllQuizProvider = ({ children }) => {
  const allQuiz = CardFlipData["Card-Flip"].map((quiz) =>
    quiz.imageSet.map((imgData) => ({ id: uuid(), imgData }))
  );

  return (
    <AllQuizContext.Provider value={{ allQuiz }}>
      {children}
    </AllQuizContext.Provider>
  );
};

const useAllQuiz = () => useContext(AllQuizContext);

export { AllQuizProvider, useAllQuiz };
