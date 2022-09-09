import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
};

export const Logo = ({ size = 'md' }: Props) => {
  return (
    <Link href="/">
      <a
        aria-label="profile overflow logo"
        className={clsx('flex gap-1', `text-${size}`)}
      >
        <span>profile</span>
        <span className="font-bold">overflow</span>
      </a>
    </Link>
  );
};
