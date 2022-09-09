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
        'bg-slate-50',
      )}
    >
      {children}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }

          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        div {
          animation: fadeIn 0.3s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};
