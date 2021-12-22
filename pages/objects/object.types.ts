import { IObject } from '../../types';

export interface IPath {
  params: { id: string };
}

export interface IGetStaticPathsProps {
  paths: IPath[];
  fallback: boolean;
}

export interface IPageProps {
  object: IObject;
}
