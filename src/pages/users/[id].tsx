import clsx from 'clsx';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Container } from '../../components/Container/Container';
import { Logo } from '../../components/Logo/Logo';
import { MetaTags } from '../../components/MetaTags/MetaTags';
import { Box } from '../../components/UserProfilePage/Box';
import { Grid } from '../../components/UserProfilePage/Grid';
import { getTopAnswers } from '../../lib/stackapps/api/topAnswers';
import { getTopQuestions } from '../../lib/stackapps/api/topQuestions';
import { getTopTags } from '../../lib/stackapps/api/topTags';
import { getUser } from '../../lib/stackapps/api/user';
import {
  Answer,
  Badge,
  Question,
  StackUserData,
  Tag,
} from '../../lib/stackapps/types';
import { Profile } from '../../components/UserProfilePage/Profile/Profile';
import { Reputation } from '../../components/UserProfilePage/Reputation/Reputation';
import { Stat } from '../../components/UserProfilePage/Profile/Stat';
import { formatNumber } from '../../lib/number/formatNumber';
import { TopTags } from '../../components/UserProfilePage/TopTags/TopTags';
import { RecentBadges } from '../../components/UserProfilePage/RecentBadges/RecentBadges';
import { getBadges } from '../../lib/stackapps/api/badges';
import { TopQnAs } from '../../components/UserProfilePage/TopQnAs/TopQnAs';
import Link from 'next/link';
import { TwitterShareButtonAnchor } from '../../components/TwitterShare/TwitterShareButtonAnchor';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { STACK_APP_COOKIE_NAME } from '../../lib/stackapps';

type Props = {
  userData: StackUserData;
  topTags: Tag[];
  topQuestions: Question[];
  topAnswers: Answer[];
  badges: Badge[];
};

const UserPage: NextPage<Props> = ({
  userData,
  topTags,
  topAnswers,
  topQuestions,
  badges,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const width = typeof window === 'undefined' ? 0 : window.innerWidth;

  if (!userData) return null;

  return (
    <>
      <MetaTags
        title={`Check out ${userData.display_name} StackOverflow profile summary | ProfileOverflow`}
        ogPath={`api/og/users/${userData.user_id}`}
      />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-8 md:py-24 flex flex-col w-full max-w-[700px] mx-auto gap-8">
            <h1 className="self-center">
              <Logo size="3xl" />
            </h1>

            <AnimatePresence initial={!shouldReduceMotion && width > 720}>
              <Grid>
                <Box gridArea="first">
                  <Profile userData={userData} />
                </Box>
                <Box gridArea="second">
                  <Reputation
                    reputation={userData.reputation}
                    reputationYearDelta={userData.reputation_change_year}
                  />
                </Box>
                <Box gridArea="third">
                  <RecentBadges badges={badges} userData={userData} />
                </Box>
                <Box gridArea="fourth">
                  <div className="h-full flex items-center">
                    <Stat
                      value={formatNumber(userData.question_count)}
                      label="Questions asked"
                      size="4xl"
                    />
                  </div>
                </Box>
                <Box gridArea="fifth">
                  <TopTags tags={topTags} userId={userData.user_id} />
                </Box>
                <Box gridArea="sixth">
                  <div className="h-full flex items-center">
                    <Stat
                      value={formatNumber(userData.answer_count)}
                      label="Answers given"
                      size="4xl"
                    />
                  </div>
                </Box>
                <Box gridArea="seventh">
                  <TopQnAs
                    questions={topQuestions}
                    answers={topAnswers}
                    userData={userData}
                  />
                </Box>
              </Grid>
            </AnimatePresence>

            <div
              className={clsx(
                'my-8 flex flex-col md:flex-row gap-8 justify-center items-center',
              )}
            >
              <TwitterShareButtonAnchor
                text={`Check out my ProfileOverflow! https://profile-overflow.vercel.app/users/${userData.user_id}`}
              >
                Share on Twitter
              </TwitterShareButtonAnchor>
              <Link href="/">
                <a className="underline-offset-2 underline">Get your own!</a>
              </Link>
            </div>
          </main>
        </Container>
      </div>
    </>
  );
};

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = context?.params?.id?.toString() || '';
  const accessToken = context.req.cookies[STACK_APP_COOKIE_NAME];

  try {
    if (Number(userId) > 0) {
      const [userData, topQuestions, topTags, topAnswers, badges] =
        await Promise.all([
          getUser(userId, accessToken),
          getTopQuestions(userId, accessToken),
          getTopTags(userId, accessToken),
          getTopAnswers(userId, accessToken),
          getBadges(userId, accessToken),
        ]);

      const result = {
        userData,
        topQuestions: topQuestions.questions,
        topTags,
        topAnswers: topAnswers.answers,
        badges: badges?.slice(0, 3),
      };

      context.res.setHeader(
        'Cache-Control',
        `public, s-maxage=${2 * 24 * 60 * 60}`,
      );

      return {
        props: {
          ...result,
        },
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
