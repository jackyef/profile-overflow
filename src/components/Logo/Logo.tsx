import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
};

export const Logo = ({ size = 'md' }: Props) => {
  return (
    <Link href="/" passHref>
      <motion.a
        layoutId="logo"
        aria-label="profile overflow logo"
        className={clsx('flex gap-1', `text-${size}`)}
      >
        <span>profile</span>
        <span className="font-bold">overflow</span>
      </motion.a>
    </Link>
  );
};
