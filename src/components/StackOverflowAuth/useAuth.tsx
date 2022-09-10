import { useQuery } from '@tanstack/react-query';

export const fetchAuthStatus = async () => {
  const response = await fetch(`/api/auth/check`);

  if (!response.ok) {
    throw new Error();
  }

  const json = await response.json();

  return json.isAuthenticated as boolean;
};

export const useAuth = () => {
  const { data, isLoading } = useQuery([`auth`], () => fetchAuthStatus(), {
    staleTime: Infinity,
  });

  return {
    isAuthenticated: data,
    isLoading,
  };
};
