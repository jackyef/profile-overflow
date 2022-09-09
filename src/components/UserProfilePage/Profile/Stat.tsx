import clsx from 'clsx';

type Props = {
  value: string | number;
  label: string;
  size?: '2xl' | '3xl' | '4xl' | '5xl';
};
export const Stat = ({ value, label, size = '2xl' }: Props) => {
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
      <span className={`text-${size} font-bold`}>{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};
