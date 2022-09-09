import clsx from 'clsx';
import type { NextPage } from 'next';
import { Logo } from '../components/Logo/Logo';
import { MetaTags } from '../components/MetaTags/MetaTags';
import { UserSearchInput } from '../components/UserSearchInput/UserSearchInput';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={clsx('py-8', 'px-4', 'max-w-6xl', 'mx-auto')}>
      {children}
    </div>
  );
};

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
