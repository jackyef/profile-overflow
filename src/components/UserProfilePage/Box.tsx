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
        div {
          aspect-ratio: ${getAspectRatio()};
        }

        @media (max-width: 740px) {
          div {
            aspect-ratio: revert;
            width: 100%;
            max-width: 334px;
          }
        }
      `}</style>
    </div>
  );
};
