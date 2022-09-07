import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const SearchResultBox = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'my-4',
        'rounded-lg',
        'shadow-lg',
        'shadow-slate-300',
      )}
    >
      {children}
    </div>
  );
};
