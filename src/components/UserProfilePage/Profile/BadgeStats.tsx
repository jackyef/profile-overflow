import clsx from 'clsx';

type Props = {
  count: number;
  type: 'bronze' | 'silver' | 'gold';
};

export const BadgeStats = ({ count, type }: Props) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'flex-1',
        'items-center',
        'p-2',
        'rounded-2xl',
        'gap-1',
        {
          'text-amber-700': type === 'bronze',
          'bg-amber-50': type === 'bronze',
          'border border-amber-400': type === 'bronze',
        },
        {
          'text-gray-700': type === 'silver',
          'bg-gray-50': type === 'silver',
          'border border-gray-400': type === 'silver',
        },
        {
          'text-yellow-700': type === 'gold',
          'bg-yellow-50': type === 'gold',
          'border border-yellow-400': type === 'gold',
        },
      )}
    >
      <span className="text-3xl font-bold">{count}</span>
      <span className="text-xs capitalize">{type}s</span>
    </div>
  );
};
