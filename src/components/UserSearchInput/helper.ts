import { StackUserData } from '../../lib/stackapps/types';

export const fetchUsers = async (inname: string) => {
  if (!inname) return [];

  const response = await fetch(`/api/users?name=${inname}`);

  if (!response.ok) {
    throw new Error();
  }

  const json = await response.json();

  return json.users as StackUserData[];
};

const getRandomHexValue = () => Math.floor(Math.random() * 255).toString(16);

export const getRandomHexColor = () => {
  return `${getRandomHexValue()}${getRandomHexValue()}${getRandomHexValue()}`;
};
