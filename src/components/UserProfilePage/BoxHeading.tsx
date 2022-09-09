import { PropsWithChildren } from 'react';

export const BoxHeading = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <h2
      className={`text-gray-400 uppercase tracking-wider font-semibold ${className}`}
    >
      {children}
    </h2>
  );
};
