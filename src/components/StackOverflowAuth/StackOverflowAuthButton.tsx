// This component is used to implement implicit OAuth 2.0 flow as described in
// StackExchange's API docs: https://api.stackexchange.com/docs/authentication
// The goal is to achieve more API quota
import clsx from 'clsx';
import DotsHorizontalIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';

import { STACK_APP_CLIENT_ID } from '../../lib/stackapps';

const BASE_URL = 'https://stackoverflow.com/oauth/dialog';
const BASE_PARAMS = new URLSearchParams();
BASE_PARAMS.append('client_id', STACK_APP_CLIENT_ID);
BASE_PARAMS.append(
  'redirect_uri',
  'https://profile-overflow.vercel.app/oauth/success',
);

type Props = {
  isLoading?: boolean;
};

export const StackOverflowAuthButton = ({ isLoading = false }: Props) => {
  const shouldBeDisabled = isLoading;

  return (
    <a
      href={shouldBeDisabled ? '#' : `${BASE_URL}?${BASE_PARAMS.toString()}`}
      className={clsx(
        'rounded-xl',
        'text-white bg-orange-500 px-4 py-2',
        'hover:bg-orange-300 focus:bg-orange-300',
        'focus:outline-none focus:ring-4 focus:ring-orange-500',
        {
          'opacity-60': isLoading,
          'pointer-events-none': isLoading,
        },
      )}
    >
      {isLoading ? (
        <DotsHorizontalIcon height={16} className={'animate-pulse'} />
      ) : (
        'Login with StackOverflow'
      )}
    </a>
  );
};
