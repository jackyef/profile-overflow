import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import clsx from 'clsx';

type Props = {
  link: string;
};

export const StackOverflowLink = ({ link }: Props) => {
  return (
    <a
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
        'w-full',
        'text-sm',
        'text-center',
        'border-2 border-orange-400 rounded-xl',
        'text-orange-600',
        'focus:bg-orange-50',
        'hover:bg-orange-50',
        'py-2 px-4',
      )}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      View on StackOverflow
      <ArrowTopRightOnSquareIcon height={16} />
    </a>
  );
};
