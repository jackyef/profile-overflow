import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon';
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon';
import { formatReputation } from '../../../lib/number/formatReputation';
import clsx from 'clsx';
import { ReputationIcon } from '../../icons/ReputationIcon';
import { BoxHeading } from '../BoxHeading';

type Props = {
  reputation: number;
  reputationYearDelta: number;
};

export const Reputation = ({ reputation, reputationYearDelta }: Props) => {
  const isDeltaPositive = reputationYearDelta >= 0;

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'relative', 'isolate')}>
      <ReputationIcon
        className={clsx(
          'absolute',
          'left-[-30px]',
          'bottom-[-50px]',
          'pointer-events-none',
          'text-slate-300',
          'z-[-1]',
          'rotate-12',
        )}
        width={160}
        height={160}
      />
      <BoxHeading className="self-end">Reputation</BoxHeading>
      <div className={clsx('text-5xl', 'font-bold', 'self-end')}>
        {formatReputation(reputation)}
      </div>
      <div
        className={clsx(
          'flex flex-col',
          'items-center',
          'self-end',
          'text-sm',
          {
            'text-emerald-600': isDeltaPositive,
            'text-red-600': !isDeltaPositive,
          },
        )}
      >
        <div className={clsx('flex', 'text-xl', 'items-center', 'font-bold')}>
          {isDeltaPositive ? (
            <ArrowLongUpIcon height={24} width={24} strokeWidth={2} />
          ) : (
            <ArrowLongDownIcon height={24} width={24} strokeWidth={2} />
          )}{' '}
          {formatReputation(reputationYearDelta)}
          <div className="text-sm font-medium ml-1">this year</div>
        </div>
      </div>
    </div>
  );
};
