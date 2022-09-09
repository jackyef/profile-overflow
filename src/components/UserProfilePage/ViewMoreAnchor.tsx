import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import clsx from 'clsx';

type Props = {
  href: string;
};
export const ViewAllAnchor = ({ href }: Props) => {
  return (
    <a
      className={clsx(
        'mt-1',
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
        'w-full',
        'text-sm',
        'text-center',
        'rounded-lg',
        'text-slate-600',
        'focus:underline',
        'hover:underline',
        'focus:outline-none focus:ring-slate-300 focus:ring-4',
      )}
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      View all
      <ArrowTopRightOnSquareIcon height={16} />
    </a>
  );
};
