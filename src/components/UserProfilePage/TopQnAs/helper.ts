import { Question } from '../../../lib/stackapps/types';

export const fetchQuestion = async (questionId: number) => {
  if (!questionId) return null;

  const response = await fetch(`/api/questions/${questionId}`);

  if (!response.ok) {
    throw new Error();
  }

  const json = await response.json();

  return json.question as Question;
};
