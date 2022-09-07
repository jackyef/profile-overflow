import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { Tag, StackResponse } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users/:id/top-tags`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('pagesize', '5');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('key', STACK_APP_KEY);

export const getTopTags = async (userId: string): Promise<Tag[] | null> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', userId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<Tag>;

      return json.items;
    } else {
      const errorJson = await response.json();

      console.error(`[api/getTopTags] ${errorJson}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return null;
  }
};
