import clsx from 'clsx';

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={clsx('py-8', 'px-4', 'max-w-6xl', 'mx-auto')}>
      {children}
    </div>
  );
};
