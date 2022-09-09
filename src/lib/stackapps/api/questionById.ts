import fetch from 'isomorphic-unfetch';
import { STACK_APP_KEY } from '../index';
import type { Question, StackResponse } from '../types';

const BASE_URL = `https://api.stackexchange.com/2.3/questions/:id`;
const BASE_PARAMS = new URLSearchParams();

BASE_PARAMS.append('order', 'desc');
BASE_PARAMS.append('sort', 'activity');
BASE_PARAMS.append('site', 'stackoverflow');
BASE_PARAMS.append('filter', '!)qCrR97cMDxTyXhlPWnE');
BASE_PARAMS.append('key', STACK_APP_KEY);

export const getQuestionById = async (
  questionId: string,
): Promise<Question | null> => {
  const params = new URLSearchParams(BASE_PARAMS.toString());

  try {
    const response = await fetch(
      `${BASE_URL.replace(':id', questionId)}?${params.toString()}`,
    );

    if (response.ok) {
      const json = (await response.json()) as StackResponse<Question>;

      return json.items[0];
    } else {
      const errorJson = await response.json();

      console.error(`[api/getQuestionById] ${JSON.stringify(errorJson)}`);
      throw new Error('Received unsuccessful response from StackExchange API');
    }
  } catch (err) {
    return null;
  }
};
