import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container/Container';
import { Logo } from '../../components/Logo/Logo';
import { MetaTags } from '../../components/MetaTags/MetaTags';
import { StackOverflowAuthButton } from '../../components/StackOverflowAuth/StackOverflowAuthButton';

const OAuthSuccessPage: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const [accessTokenPart, expiresPart] = location.hash
      .replace('#', '')
      .split('&');

    const accessToken = accessTokenPart.replace('access_token=', '');
    const expires = expiresPart.replace('expires=', '');

    const params = new URLSearchParams();
    params.append('accessToken', accessToken);
    params.append('expires', expires);

    const storeToCookie = async () => {
      try {
        const response = await fetch(
          `/api/auth/storeToken?${params.toString()}`,
        );

        if (!response.ok) {
          const json = await response.json();
          throw new Error(json?.error ?? 'An unknown error occured');
        }

        router.push('/');
      } catch (err) {
        if ('message' in err!) {
          // @ts-expect-error
          setErrorMessage(err.message);
        }
      }
    };

    storeToCookie();
  }, [router]);

  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-24 md:py-48 flex flex-col w-full max-w-xl mx-auto gap-8">
            <h1 className="self-center">
              <Logo size="3xl" />
            </h1>

            <div
              className={clsx(
                'text-center',
                'mt-8 p-8 flex flex-col gap-8 items-center',
                'bg-amber-50 border border-amber-500 text-amber-700',
                'rounded-lg',
              )}
            >
              <h2 className="text-amber-700 uppercase tracking-wider font-semibold">
                {errorMessage ? 'Error!' : 'Logging you in...'}
              </h2>
              {errorMessage ? (
                <p>
                  An error happened, please try logging in again{' '}
                  <span aria-hidden>😢</span>
                </p>
              ) : (
                <p>
                  You will get extra API calls quota for this!{' '}
                  <span aria-hidden>🎉</span>
                </p>
              )}
              <StackOverflowAuthButton isLoading={!errorMessage} />

              {Boolean(errorMessage) && (
                <div
                  className={clsx(
                    'p-4 flex flex-col items-center text-sm',
                    'bg-red-50 border border-red-500 text-red-700',
                    'rounded-lg',
                  )}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </main>
        </Container>
      </div>
    </>
  );
};

export default OAuthSuccessPage;
