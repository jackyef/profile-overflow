import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
  gridArea: string;
};

export const Box = ({ children, gridArea }: PropsWithChildren<Props>) => {
  const getAspectRatio = () => {
    if (['first', 'fourth', 'sixth'].includes(gridArea)) {
      return '1 / 1';
    }
  };

  return (
    <div
      style={{
        gridArea,
        aspectRatio: getAspectRatio(),
      }}
      className={clsx(
        'p-4',
        'flex-1',
        'bg-slate-100',
        'shadow-lg',
        'shadow-slate-300',
        'rounded-2xl',
        'w-full',
        'h-full',
      )}
    >
      {children}

      <style jsx>{`
        @media (max-width: 740px) {
          div {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};
