import { FC } from 'react';
import { createTitleString } from '../../helper';
import { IHeadingProps } from './Heading.types';

export const Heading: FC<IHeadingProps> = ({
  title,
  subTitle,
  designed,
  designer,
}) => {
  return (
    <h1>
      <span className="block text-2xl md:text-4xl py-2">
        {createTitleString(title, subTitle, designed)}
      </span>
      {designer && (
        <span className="block text-2xl md:text-4xl text-gray-400 py-2">
          {designer}
        </span>
      )}
    </h1>
  );
};
