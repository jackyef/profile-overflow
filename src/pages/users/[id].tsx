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
  Question,
  StackUserData,
  Tag,
} from '../../lib/stackapps/types';
import { Profile } from '../../components/UserProfilePage/Profile/Profile';
import { Reputation } from '../../components/UserProfilePage/Reputation/Reputation';
import { Stat } from '../../components/UserProfilePage/Profile/Stat';
import { formatNumber } from '../../lib/number/formatNumber';

type Props = {
  userData: StackUserData;
  topTags: Tag[];
  topQuestions: Question[];
  topAnswers: Answer[];
};

const UserPage: NextPage<Props> = ({
  userData,
  topTags,
  topAnswers,
  topQuestions,
}) => {
  console.log({ userData, topQuestions, topAnswers, topTags });

  if (!userData) return null;

  return (
    <>
      <MetaTags />
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <Container>
          <main className="py-24 flex flex-col w-full max-w-[700px] mx-auto gap-8">
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
              <Box gridArea="third">Recent badges</Box>
              <Box gridArea="fourth">
                <div className="h-full flex items-center">
                  <Stat
                    value={formatNumber(userData.question_count)}
                    label="Questions asked"
                    size="4xl"
                  />
                </div>
              </Box>
              <Box gridArea="fifth">Top tags</Box>
              <Box gridArea="sixth">
                <div className="h-full flex items-center">
                  <Stat
                    value={formatNumber(userData.answer_count)}
                    label="Answers given"
                    size="4xl"
                  />
                </div>
              </Box>
              <Box gridArea="seventh">Top questions and answers</Box>
            </Grid>
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
    const [userData, topQuestions, topTags, topAnswers] = await Promise.all([
      getUser(userId),
      getTopQuestions(userId),
      getTopTags(userId),
      getTopAnswers(userId),
    ]);

    const result = {
      userData,
      topQuestions: topQuestions.questions,
      topTags,
      topAnswers: topAnswers.answers,
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
    },
    revalidate: 2 * 24 * 60 * 60, // revalidate at most every 2 days
  };
}
