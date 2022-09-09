import clsx from 'clsx';
import { GetStaticPropsContext, NextPage } from 'next';
import { Logo } from '../../../components/Logo/Logo';
import { MetaTags } from '../../../components/MetaTags/MetaTags';
import { Box } from '../../../components/UserProfilePage/Box';
import { getUser } from '../../../lib/stackapps/api/user';
import { StackUserData } from '../../../lib/stackapps/types';
import { Reputation } from '../../../components/UserProfilePage/Reputation/Reputation';
import { Stat } from '../../../components/UserProfilePage/Profile/Stat';
import { formatNumber } from '../../../lib/number/formatNumber';
import { AnimatePresence } from 'framer-motion';

type Props = {
  userData: StackUserData;
};

const UserPage: NextPage<Props> = ({ userData }) => {
  if (!userData) return null;

  return (
    <>
      <MetaTags
        title={`Check out ${userData.display_name} StackOverflow profile summary | ProfileOverflow`}
      />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <AnimatePresence initial={false}>
          <div className="relative h-[630px] w-full">
            <div
              className={clsx('w-[320px] h-[140px] absolute top-8 right-8')}
              style={{
                transform: 'scale(2.4) translate(-10px, 20px)',
                transformOrigin: '100% 0%',
              }}
            >
              <Box>
                <Reputation
                  reputation={userData.reputation}
                  reputationYearDelta={userData.reputation_change_year}
                />
              </Box>
            </div>
            <div
              className="w-[140px] h-[140px] absolute left-8 bottom-8"
              style={{
                transform: 'scale(2.7) translate(30px, -8px) rotate(-10deg)',
                transformOrigin: '0% 100%',
              }}
            >
              <Box>
                <div className="h-full flex items-center">
                  <Stat
                    value={formatNumber(userData.answer_count)}
                    label="Answers given"
                    size="4xl"
                  />
                </div>
              </Box>
            </div>

            <div
              className="absolute right-16 bottom-16"
              style={{
                transform: 'scale(1.8)',
                transformOrigin: '100% 50%',
              }}
            >
              <Logo />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default UserPage;

export async function getStaticPaths() {
  return {
    paths: [],
    // statically render this path incrementally on runtime
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const userId = context?.params?.id?.toString() || '';

  try {
    if (Number(userId) > 0) {
      const [userData] = await Promise.all([getUser(userId)]);

      const result = {
        userData,
      };

      return {
        props: {
          ...result,
        },

        revalidate: 2 * 24 * 60 * 60, // revalidate at most every 2 days
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
