import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { StackUserData, StackUsersResponse } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('sort', 'reputation');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('key', STACK_APP_KEY);

export const getUsers = async (inName: string): Promise<StackUserData[]> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());
  params.append('inname', inName);

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (response.ok) {
      const json = (await response.json()) as StackUsersResponse;

      console.log({ a: json.quota_remaining });

      return json.items;
    } else {
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return [];
  }
};
