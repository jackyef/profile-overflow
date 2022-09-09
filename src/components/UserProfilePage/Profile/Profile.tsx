import clsx from 'clsx';
import { StackUserData } from '../../../lib/stackapps/types';
import { Stat } from './Stat';
import { StackOverflowLink } from './StackOverflowLink';
import { GeneralInfo } from './GeneralInfo';
import { BadgeStats } from './BadgeStats';

type Props = {
  userData: StackUserData;
};

export const Profile = ({ userData }: Props) => {
  const totalQuestions = userData.question_count;
  const totalAnswers = userData.answer_count;

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'flex-1',
        'justify-between',
        'gap-4',
        'h-full',
      )}
    >
      <GeneralInfo userData={userData} />
      <div className={clsx('flex', 'gap-4')}>
        <BadgeStats type="gold" count={userData.badge_counts.gold} />
        <BadgeStats type="silver" count={userData.badge_counts.silver} />
        <BadgeStats type="bronze" count={userData.badge_counts.bronze} />
      </div>

      <div className={clsx('flex')}>
        <StackOverflowLink link={userData.link} />
      </div>
    </div>
  );
};
