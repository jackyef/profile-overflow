import clsx from 'clsx';
import { motion } from 'framer-motion';
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

  const getAnimationDescriptors = () => {
    if (gridArea === 'first') {
      return {
        initial: { translateY: 100, translateX: -300, scale: 3 },
        animate: { translateY: 0, translateX: -0, scale: 1 },
        exit: { translateY: 100, translateX: -300, scale: 3 },
        transition: {
          type: 'spring',
          damping: 40,
          stiffness: 80,
        },
      };
    }

    if (gridArea === 'second') {
      return {
        initial: { opacity: 0, translateY: -200, translateX: 300, scale: 1.3 },
        animate: { opacity: 1, translateY: 0, translateX: -0, scale: 1 },
        exit: { opacity: 0, translateY: -200, translateX: 300, scale: 1.3 },
        transition: {
          type: 'spring',
          damping: 40,
          stiffness: 60,
          delay: 0.2,
        },
      };
    }

    if (gridArea === 'third') {
      return {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 },
        transition: {
          type: 'spring',
          damping: 30,
          stiffness: 70,
          delay: 0.4,
        },
      };
    }

    if (gridArea === 'fourth') {
      return {
        initial: { opacity: 0, translateY: -50, translateX: 0, scale: 0.8 },
        animate: { opacity: 1, translateY: 0, translateX: 0, scale: 1 },
        exit: { opacity: 0, translateY: -50, translateX: 0, scale: 0.8 },
        transition: {
          type: 'spring',
          damping: 40,
          stiffness: 60,
          delay: 0.5,
        },
      };
    }

    if (gridArea === 'fifth') {
      return {
        initial: { opacity: 0, translateY: 400, translateX: 0, scale: 0.8 },
        animate: { opacity: 1, translateY: 0, translateX: 0, scale: 1 },
        exit: { opacity: 0, translateY: 400, translateX: 0, scale: 0.8 },
        transition: {
          type: 'spring',
          damping: 30,
          stiffness: 60,
          delay: 0.6,
        },
      };
    }

    if (gridArea === 'sixth') {
      return {
        initial: { opacity: 0, translateY: 50, translateX: 0, scale: 0.8 },
        animate: { opacity: 1, translateY: 0, translateX: 0, scale: 1 },
        exit: { opacity: 0, translateY: 50, translateX: 0, scale: 0.8 },
        transition: {
          type: 'spring',
          damping: 40,
          stiffness: 60,
          delay: 0.6,
        },
      };
    }

    if (gridArea === 'seventh') {
      return {
        initial: { opacity: 0, translateY: 100, translateX: 0, scale: 1.3 },
        animate: { opacity: 1, translateY: 0, translateX: 0, scale: 1 },
        exit: { opacity: 0, translateY: 100, translateX: 0, scale: 1.3 },
        transition: {
          type: 'spring',
          damping: 40,
          stiffness: 70,
          delay: 0.8,
        },
      };
    }
  };

  return (
    <motion.div
      style={{
        gridArea,
      }}
      className={clsx(
        'p-4',
        'flex-1',
        'bg-slate-100',
        'shadow-lg',
        'shadow-slate-300',
        'rounded-3xl',
        'w-full',
        'h-full',
        'overflow-hidden',
      )}
      {...getAnimationDescriptors()}
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
    </motion.div>
  );
};
