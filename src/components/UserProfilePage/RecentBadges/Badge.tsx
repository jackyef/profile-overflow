import clsx from 'clsx';

type Props = {
  count: number;
  type: 'bronze' | 'silver' | 'gold';
  name: string;
};

export const Badge = ({ count, type, name }: Props) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-1',
        'justify-between',
        'items-center',
        'py-2 px-4',
        'rounded-2xl',
        'gap-1',
        {
          'text-amber-700': type === 'bronze',
          'bg-amber-50/60': type === 'bronze',
          'border border-amber-400': type === 'bronze',
        },
        {
          'text-gray-700': type === 'silver',
          'bg-gray-50/60': type === 'silver',
          'border border-gray-400': type === 'silver',
        },
        {
          'text-yellow-700': type === 'gold',
          'bg-yellow-50/60': type === 'gold',
          'border border-yellow-400': type === 'gold',
        },
      )}
    >
      <span className="text-sm capitalize">{name}</span>
      <span className="text-xs font-bold">&times;{count}</span>
    </div>
  );
};
