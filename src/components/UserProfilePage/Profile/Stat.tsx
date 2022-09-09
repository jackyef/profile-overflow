import clsx from 'clsx';

type Props = {
  value: string | number;
  label: string;
};
export const Stat = ({ value, label }: Props) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-1',
        'flex-col',
        'gap-2',
        'items-center',
        'text-center',
      )}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};
