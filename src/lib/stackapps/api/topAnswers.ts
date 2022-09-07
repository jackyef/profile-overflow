import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { StackResponse, Answer } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users/:id/answers`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('page', '1');
BASE_PARAMS.append('pagesize', '3');
BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('sort', 'votes');
BASE_PARAMS.append('filter', '!LL4*NmXTY-DV-lNd)MJKUn');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('key', STACK_APP_KEY);

type Result = {
  answers: Answer[];
  total: number;
};
export const getTopAnswers = async (userId: string): Promise<Result> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', userId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<Answer>;

      return {
        answers: json.items,
        total: json.total,
      };
    } else {
      const errorJson = await response.json();

      console.error(`[api/getTopAnswers] ${errorJson}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return {
      answers: [],
      total: 0,
    };
  }
};
