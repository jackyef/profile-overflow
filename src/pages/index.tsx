import clsx from 'clsx';
import type { NextPage } from 'next';
import { MetaTags } from '../components/MetaTags/MetaTags';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={clsx('p-8', 'max-w-6xl', 'mx-auto')}>{children}</div>;
};

const Home: NextPage = () => {
  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className={clsx('xl:flex', 'justify-between', 'mb-16')}>
            Hello world
          </main>
        </Container>
      </div>
    </>
  );
};

export default Home;
