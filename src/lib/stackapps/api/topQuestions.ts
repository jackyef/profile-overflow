import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { StackResponse, Question } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/users/:id/questions`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('page', '1');
BASE_PARAMS.append('pagesize', '3');
BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('sort', 'votes');
BASE_PARAMS.append('filter', '!)5fkAq789YkrvnV7Dwmdjcdsbn1p');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('key', STACK_APP_KEY);

type Result = {
  questions: Question[];
  total: number;
};
export const getTopQuestions = async (userId: string): Promise<Result> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', userId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<Question>;

      return {
        questions: json.items,
        total: json.total,
      };
    } else {
      const errorJson = await response.json();

      console.error(`[api/getTopQuestions] ${errorJson}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return {
      questions: [],
      total: 0,
    };
  }
};
