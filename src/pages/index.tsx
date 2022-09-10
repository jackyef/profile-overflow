import clsx from 'clsx';
import type { NextPage } from 'next';
import { Container } from '../components/Container/Container';
import { Logo } from '../components/Logo/Logo';
import { MetaTags } from '../components/MetaTags/MetaTags';
import { StackOverflowAuthButton } from '../components/StackOverflowAuth/StackOverflowAuthButton';
import { useAuth } from '../components/StackOverflowAuth/useAuth';
import { UserSearchInput } from '../components/UserSearchInput/UserSearchInput';

const Home: NextPage = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-24 md:py-48 flex flex-col w-full max-w-xl mx-auto gap-8">
            <h1 className="self-center">
              <Logo size="4xl" />
            </h1>

            <UserSearchInput />

            <div
              className={clsx(
                'text-center',
                'm-8 p-8 flex flex-col gap-8 items-center',
                'bg-amber-50 border border-amber-500 text-amber-700',
                'rounded-lg',
                'text-sm',
              )}
            >
              <h2 className="text-amber-700 uppercase tracking-wider font-semibold">
                Disclaimer
              </h2>
              <p>
                This site is not affiliated with StackOverflow. It is querying
                data from the StackExchange APIs.
              </p>

              {isAuthenticated ? (
                <p>
                  You are currently logged in and benefitting from extra API
                  quota <span aria-hidden>🎉</span>
                </p>
              ) : (
                <>
                  <p>
                    The API have limited quota, so sometimes you might see
                    missing data. You can log in with StackOverflow to get more
                    quota.
                  </p>
                  <StackOverflowAuthButton isLoading={isAuthLoading} />
                </>
              )}
            </div>
          </main>
        </Container>
      </div>
    </>
  );
};

export default Home;
