import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const EmptyState = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={clsx(
        'flex items-center text-center justify-center h-full w-full',
      )}
    >
      <p
        className={`text-gray-400 text-sm uppercase tracking-wider font-semibold ${className}`}
      >
        {children}
      </p>
    </div>
  );
};
