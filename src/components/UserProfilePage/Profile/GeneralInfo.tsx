import clsx from 'clsx';
import {
  formatDayMonthYear,
  formatMonthYear,
} from '../../../lib/datetime/format';
import { StackUserData } from '../../../lib/stackapps/types';
import { SkipSSR } from '../../SkipSSR';

type Props = {
  userData: StackUserData;
};

export const GeneralInfo = ({ userData }: Props) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4', 'items-center')}>
      <img
        className={clsx('rounded-lg')}
        width={80}
        height={80}
        src={userData.profile_image}
        alt=""
      />
      <div className={clsx('flex', 'flex-col', 'gap-1', 'text-center')}>
        <span className="font-bold">{userData.display_name}</span>
        <span className="text-gray-700 text-sm">
          Member since{' '}
          <SkipSSR
            fallback={new Date(userData.creation_date * 1000).toDateString()}
          >
            {formatMonthYear(new Date(userData.creation_date * 1000))}
          </SkipSSR>
        </span>
        <span className="text-gray-700 text-sm">
          Last seen on{' '}
          <SkipSSR
            fallback={new Date(userData.last_access_date * 1000).toDateString()}
          >
            {formatDayMonthYear(new Date(userData.last_access_date * 1000))}
          </SkipSSR>
        </span>
      </div>
    </div>
  );
};
