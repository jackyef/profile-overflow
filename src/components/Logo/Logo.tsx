import clsx from 'clsx';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
};

export const Logo = ({ size = 'md' }: Props) => {
  return (
    <div
      aria-label="profile overflow logo"
      className={clsx('flex gap-1', `text-${size}`)}
    >
      <span>profile</span>
      <span className="font-bold">overflow</span>
    </div>
  );
};
