import { FC, memo, ReactNode } from 'react';

import { ITransformedDecomposition, IUserData } from '../../types';
import { NavigationItem } from '../NavigationItem';

interface IProps {
  data: ITransformedDecomposition[];
  user: IUserData | null;
  children?: ReactNode;
}

export const NavigationIner: FC<IProps> = ({ data, user, children }) => {
  return (
    <ul>
      {data.map((item) => {
        return <NavigationItem key={item.id} menuItem={item} user={user} />;
      })}
      {children}
    </ul>
  );
};

export const NavigationList = memo(NavigationIner);
