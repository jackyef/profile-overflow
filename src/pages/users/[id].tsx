import clsx from 'clsx';
import { GetStaticPropsContext, NextPage } from 'next';
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
  if (!userData) return null;

  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-8 md:py-24 flex flex-col w-full max-w-[700px] mx-auto gap-8">
            <div className="self-center">
              <Logo size="3xl" />
            </div>

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

export async function getStaticPaths() {
  return {
    paths: [],
    // statically render this path incrementally on runtime
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const userId = context?.params?.id?.toString() || '';

  if (Number(userId) > 0) {
    const [userData, topQuestions, topTags, topAnswers, badges] =
      await Promise.all([
        getUser(userId),
        getTopQuestions(userId),
        getTopTags(userId),
        getTopAnswers(userId),
        getBadges(userId),
      ]);

    const result = {
      userData,
      topQuestions: topQuestions.questions,
      topTags,
      topAnswers: topAnswers.answers,
      badges: badges?.slice(0, 3),
    };

    return {
      props: {
        ...result,
      },
    };
  }

  return {
    props: {
      userData: null,
      topQuestions: [],
      topTags: [],
      topAnswers: [],
      badges: [],
    },
    revalidate: 2 * 24 * 60 * 60, // revalidate at most every 2 days
  };
}
