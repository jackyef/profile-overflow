import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import clsx from 'clsx';
import type {
  Badge as BadgeType,
  StackUserData,
} from '../../../lib/stackapps/types';
import { BoxHeading } from '../BoxHeading';
import { ViewAllAnchor } from '../ViewMoreAnchor';
import { Badge } from './Badge';

type Props = {
  badges: BadgeType[];
  userData: StackUserData;
};

export const RecentBadges = ({ badges, userData }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-3 justify-between h-full')}>
      <div className={clsx('flex flex-col gap-4')}>
        <BoxHeading>Recent badges</BoxHeading>
        <div className={clsx('flex flex-col gap-3')}>
          {badges.map((badge) => {
            return (
              <Badge
                key={badge.name}
                type={badge.rank}
                name={badge.name}
                count={badge.award_count}
              />
            );
          })}
        </div>
      </div>
      <ViewAllAnchor
        href={`https://stackoverflow.com/users/${userData.user_id}/${userData.display_name}?tab=badges`}
      />
    </div>
  );
};
