import clsx from 'clsx';
import type {
  Answer as AnswerT,
  Question as QuestionT,
  StackUserData,
} from '../../../lib/stackapps/types';
import { BoxHeading } from '../BoxHeading';
import { ViewAllAnchor } from '../ViewMoreAnchor';
import { Answer } from './Answer';
import { Question } from './Question';

type Props = {
  questions: QuestionT[];
  answers: AnswerT[];
  userData: StackUserData;
};

export const TopQnAs = ({ questions, answers, userData }: Props) => {
  return (
    <div className={clsx('flex flex-col md:flex-row gap-8 h-full')}>
      <div
        className={clsx(
          'flex flex-1 flex-col gap-4 justify-between h-full border-b pb-8 md:border-0 md:pb-0',
        )}
      >
        <div className={clsx('flex flex-col gap-4')}>
          <BoxHeading>Top questions</BoxHeading>

          {questions.map((question) => {
            return (
              <Question
                key={question.link}
                title={question.title}
                link={question.link}
                upvoteCount={question.up_vote_count}
              />
            );
          })}
        </div>

        <ViewAllAnchor
          href={`https://stackoverflow.com/users/${userData.user_id}/${userData.display_name}?tab=questions`}
        />
      </div>
      <div
        className={clsx('flex flex-1 flex-col gap-4 justify-between h-full')}
      >
        <div className={clsx('flex flex-col gap-4')}>
          <BoxHeading>Top answers</BoxHeading>

          {answers.map((answer) => {
            return (
              <Answer
                key={answer.answer_id}
                questionId={answer.question_id}
                link={answer.link}
                upvoteCount={answer.up_vote_count}
              />
            );
          })}
        </div>

        <ViewAllAnchor
          href={`https://stackoverflow.com/users/${userData.user_id}/${userData.display_name}?tab=answers`}
        />
      </div>
    </div>
  );
};
