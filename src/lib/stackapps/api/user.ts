import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { StackResponse, StackUserData } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users/:id`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('sort', 'reputation');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('key', STACK_APP_KEY);

export const getUser = async (
  userId: string,
): Promise<StackUserData | null> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', userId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<StackUserData>;

      return json.items[0];
    } else {
      const errorJson = await response.json();

      console.error(`[api/getUser] ${JSON.stringify(errorJson)}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return null;
  }
};
