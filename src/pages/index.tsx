import clsx from 'clsx';
import type { NextPage } from 'next';
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
          <main>
            <UserSearchInput />
          </main>
        </Container>
      </div>
    </>
  );
};

export default Home;
