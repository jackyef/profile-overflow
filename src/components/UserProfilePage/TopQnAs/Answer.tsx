import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { fetchQuestion } from './helper';

type Props = {
  link: string;
  questionId: number;
  upvoteCount: number;
};

export const Answer = ({ link, questionId, upvoteCount }: Props) => {
  const { data } = useQuery([`question:${questionId}`], () =>
    fetchQuestion(questionId),
  );

  const questionTitle = data?.title || `Question #${questionId}`;

  return (
    <div key={link} className={clsx('flex justify-between items-center gap-8')}>
      <a
        className={clsx('focus:underline hover:underline')}
        target="_blank"
        href={link}
        dangerouslySetInnerHTML={{ __html: questionTitle }}
        rel="noreferrer"
      />

      <div
        className={clsx(
          'flex items-center rounded-lg',
          'bg-emerald-100/60 text-emerald-700 py-1 px-2 text-md',
          'tabular-nums',
        )}
      >
        <ArrowLongUpIcon height={16} />
        {upvoteCount}
      </div>
    </div>
  );
};
