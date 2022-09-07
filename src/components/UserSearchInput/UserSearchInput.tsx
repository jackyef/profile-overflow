import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { KeyboardEventHandler, useState } from 'react';
import { fetchUsers, getRandomHexColor } from './helper';
import { SearchForm } from './SearchForm';
import { SearchResultBox } from './SearchResultBox';

interface CustomHTMLSearchForm extends HTMLFormElement {
  search: HTMLInputElement;
}

export const UserSearchInput = () => {
  const [searchedName, setSearchedName] = useState('');
  const { data } = useQuery(
    [`users[${searchedName}]`],
    () => fetchUsers(searchedName),
    {
      staleTime: Infinity,
    },
  );

  const handleSubmit: React.FormEventHandler<CustomHTMLSearchForm> = (
    event,
  ) => {
    event.preventDefault();

    setSearchedName(event.currentTarget.search.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const currentFocusedElement = document.activeElement;
    const focusableElements =
      event.currentTarget.querySelectorAll('[data-focusable]');
    const currentFocusedIndex = Array.from(focusableElements).findIndex(
      (elem) => elem === currentFocusedElement,
    );

    if (event.code === 'ArrowUp') {
      event.preventDefault();
      const newIndex =
        currentFocusedIndex === 0
          ? focusableElements.length - 1
          : currentFocusedIndex - 1;

      // @ts-expect-error
      focusableElements[newIndex].focus();
    } else if (event.code === 'ArrowDown') {
      event.preventDefault();
      const newIndex =
        currentFocusedIndex === focusableElements.length - 1
          ? 0
          : currentFocusedIndex + 1;

      // @ts-expect-error
      focusableElements[newIndex].focus();
    } else if (event.code === 'Escape') {
      event.preventDefault();

      const searchInput = event.currentTarget.querySelector(
        'input[name="search"]',
      );

      // @ts-expect-error
      searchInput.focus();
    }
  };

  return (
    <>
      <div onKeyDown={handleKeyDown}>
        <SearchForm onSubmit={handleSubmit} />

        {data && data.length > 0 && (
          <SearchResultBox>
            {data?.map((user) => {
              return (
                <Link key={user.user_id} href={`/users/${user.user_id}`}>
                  <a
                    className={clsx(
                      'flex',
                      'items-center',
                      'gap-4',
                      'p-4',
                      'first:rounded-t-lg',
                      'last:rounded-b-lg',
                      'hover:bg-orange-100',
                      'focus:bg-orange-100',
                      'outline-none',
                    )}
                    data-focusable
                  >
                    <img
                      loading="lazy"
                      className={clsx('rounded-md')}
                      height={40}
                      width={40}
                      src={
                        // profile_image from StackExchange
                        // could be referring to Google account picture, which doesn't
                        // allow request from localhost for some reason
                        process.env.NODE_ENV === 'production'
                          ? user.profile_image
                          : `https://via.placeholder.com/200x200/${getRandomHexColor()}/${getRandomHexColor()}`
                      }
                      alt=""
                    />
                    <span>{user.display_name}</span>
                  </a>
                </Link>
              );
            })}
          </SearchResultBox>
        )}
      </div>
    </>
  );
};
