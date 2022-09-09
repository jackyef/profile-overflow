import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const Grid = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={clsx('grid', 'gap-8')}>
      {children}
      <style jsx>{`
        div {
          width: 100%;
          grid-auto-columns: 1fr;
          grid-auto-rows: 1fr;
          grid-template-areas:
            'first first second second'
            'first first third fourth'
            'fifth fifth third sixth'
            'seventh seventh seventh seventh'
            'seventh seventh seventh seventh';
        }

        @media (max-width: 740px) {
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};
