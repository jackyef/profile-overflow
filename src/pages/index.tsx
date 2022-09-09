import clsx from 'clsx';
import type { NextPage } from 'next';
import { Container } from '../components/Container/Container';
import { Logo } from '../components/Logo/Logo';
import { MetaTags } from '../components/MetaTags/MetaTags';
import { UserSearchInput } from '../components/UserSearchInput/UserSearchInput';

const Home: NextPage = () => {
  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-24 flex flex-col w-full max-w-xl mx-auto gap-8">
            <div className="self-center">
              <Logo size="3xl" />
            </div>
            <UserSearchInput />
          </main>
        </Container>
      </div>
    </>
  );
};

export default Home;
