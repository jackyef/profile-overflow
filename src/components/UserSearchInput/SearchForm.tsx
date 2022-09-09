import clsx from 'clsx';
import { FormEventHandler } from 'react';
import DotsHorizontalIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';

type Props = {
  onSubmit: FormEventHandler;
  isLoading?: boolean;
};

export const SearchForm = ({ onSubmit, isLoading = false }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          readOnly={isLoading}
          autoComplete="off"
          autoFocus
          name="search"
          id="search"
          className={clsx(
            'block',
            'p-4',
            'pl-10',
            'w-full',
            'text-sm',
            'text-gray-900',
            'bg-slate-100',
            'shadow-lg',
            'shadow-slate-300',
            'rounded-lg',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-orange-300',
          )}
          placeholder="Search for StackOverflow users..."
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            'text-white',
            'absolute',
            'right-2.5',
            'bottom-2.5',
            'bg-orange-500',
            'hover:bg-orange-600',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-orange-300',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'shadow-md',
            'shadow-orange-300',
            'px-4',
            'py-2',
            'flex',
            'justify-center',
            'min-w-[80px]',
            {
              'opacity-60': isLoading,
            },
          )}
        >
          {isLoading ? (
            <DotsHorizontalIcon height={16} className={'animate-pulse'} />
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};
