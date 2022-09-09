import clsx from 'clsx';
import { Tag } from '../../../lib/stackapps/types';

import HashtagIcon from '@heroicons/react/24/solid/HashtagIcon';
import { BoxHeading } from '../BoxHeading';

type Props = {
  tags: Tag[];
  userId: number;
};

export const TopTags = ({ tags, userId }: Props) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-4',
        'justify-center',
        'relative',
        'isolate',
      )}
    >
      <HashtagIcon
        className={clsx(
          'absolute',
          'right-[-50px]',
          'bottom-[-60px]',
          'pointer-events-none',
          'text-slate-300',
          'z-[-1]',
        )}
        strokeWidth={10}
        width={160}
        height={160}
      />
      <BoxHeading>Most active in</BoxHeading>

      <div className={clsx('flex gap-2 flex-wrap')}>
        {tags.map((tag) => (
          <a
            key={tag.tag_name}
            target="_blank"
            rel="noopener noreferrer"
            href={`https://stackoverflow.com/search?q=user:${userId}+[${tag.tag_name}]`}
            className={clsx(
              'inline-flex',
              'py-1 px-2',
              'text-sm font-bold',
              'bg-blue-200/60 text-blue-700 border border-blue-200 rounded-xl',
              'hover:bg-blue-200 focus:bg-blue-200',
              'focus:outline-none focus:ring-blue-300 focus:ring-4',
            )}
          >
            #{tag.tag_name}
          </a>
        ))}
      </div>
    </div>
  );
};
