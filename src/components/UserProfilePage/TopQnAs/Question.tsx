import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon';
import clsx from 'clsx';

type Props = {
  link: string;
  title: string;
  upvoteCount: number;
};

export const Question = ({ link, title, upvoteCount }: Props) => {
  return (
    <div key={link} className={clsx('flex justify-between items-center gap-8')}>
      <a
        className={clsx('focus:underline hover:underline')}
        target="_blank"
        href={link}
        dangerouslySetInnerHTML={{ __html: title }}
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
