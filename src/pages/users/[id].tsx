import clsx from 'clsx';
import { GetStaticPropsContext, NextPage } from 'next';
import { Container } from '../../components/Container/Container';
import { Logo } from '../../components/Logo/Logo';
import { MetaTags } from '../../components/MetaTags/MetaTags';
import { SkipSSR } from '../../components/SkipSSR';
import { Box } from '../../components/UserProfilePage/Box';
import { Col } from '../../components/UserProfilePage/Col';
import { Grid } from '../../components/UserProfilePage/Grid';
import { Row } from '../../components/UserProfilePage/Row';
import { format } from '../../lib/datetime/format';
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
                <div className={clsx('flex', 'flex-col', 'gap-4')}>
                  <div className={clsx('flex', 'gap-4', 'items-center')}>
                    <img
                      className={clsx('rounded-lg')}
                      width={80}
                      height={80}
                      src={userData.profile_image}
                      alt=""
                    />
                    <div className={clsx('flex', 'flex-col', 'gap-1')}>
                      <span className="font-bold">{userData.display_name}</span>
                      <span className="text-gray-700 text-sm">
                        Member since{' '}
                        <SkipSSR
                          fallback={new Date(
                            userData.creation_date * 1000,
                          ).toDateString()}
                        >
                          {format(new Date(userData.creation_date * 1000))}
                        </SkipSSR>
                      </span>
                    </div>
                  </div>
                  <div className={clsx('flex')}></div>
                </div>
              </Box>
              <Box gridArea="second">Reputation</Box>
              <Box gridArea="third">Badges</Box>
              <Box gridArea="fourth">Reputation change this year</Box>
              <Box gridArea="fifth">Top tags</Box>
              <Box gridArea="sixth">Total questions and answers</Box>
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
    fallback: true,
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
      topQuestions,
      topTags,
      topAnswers,
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
