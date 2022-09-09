import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  text: string;
}

export const TwitterShareButtonAnchor = ({
  text,
  children,
}: PropsWithChildren<Props>) => (
  <a
    className={clsx(
      'rounded-xl',
      'text-white bg-[#1DA1F2] px-4 py-2',
      'hover:bg-[#2DB1F9] focus:bg-[#2DB1F9]',
      'focus:outline-none focus:ring-4 focus:ring-[#1DA1F2]',
    )}
    target="_blank"
    rel="noreferrer"
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
    data-size="large"
  >
    {children}
  </a>
);
