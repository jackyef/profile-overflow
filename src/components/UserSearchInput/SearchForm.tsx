import clsx from 'clsx';
import { FormEventHandler } from 'react';

type Props = {
  onSubmit: FormEventHandler;
};

export const SearchForm = ({ onSubmit }: Props) => {
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
          autoComplete="off"
          name="search"
          id="search"
          className={clsx(
            'block',
            'p-4',
            'pl-10',
            'w-full',
            'text-sm',
            'text-gray-900',
            'bg-gray-50',
            'rounded-lg',
            'border',
            'border-gray-300',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-orange-300',
          )}
          placeholder="Search for StackOverflow users..."
          required
        />
        <button
          type="submit"
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
            'px-4',
            'py-2',
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
};
