import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { StackResponse, Badge } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users/:id/badges`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('sort', 'awarded');
BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('filter', '!9QtdO*B2U'); // Omit user field
BASE_PARAMS.append('key', STACK_APP_KEY);

export const getBadges = async (
  userId: string,
  accessToken?: string,
): Promise<Badge[] | null> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  if (accessToken) {
    params.append('access_token', accessToken);
  }

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', userId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<Badge>;

      return json.items;
    } else {
      const errorJson = await response.json();

      console.error(`[api/getBadges] ${JSON.stringify(errorJson)}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return null;
  }
};
