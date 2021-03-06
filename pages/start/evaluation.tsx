import { GetStaticProps } from "next";
import * as React from "react";
import { HomeEvaluationContainer } from "../../components/start/evaluation/HomeEvaluationContainer";

import {
  RoomAssessmentQuestion,
  RoomTypes,
} from "../../interfaces/home-assessment";
import { loadBylawMultiplexer } from "../../utils/loadBylawMultiplexer";
import { loadQuestions } from "../../utils/loadQuestions";

type Props = {
  questions: { [type in RoomTypes]: RoomAssessmentQuestion[] };
};

const Evaluation: React.FC<Props> = ({ questions }) => {
  return <HomeEvaluationContainer questions={questions} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const questions = loadQuestions();
  // Unsused return value, however this is to make sure that the bylaw multiplexer
  // is validated at build time rather then at execution time
  loadBylawMultiplexer(questions);
  return { props: { questions } };
};

export default Evaluation;
