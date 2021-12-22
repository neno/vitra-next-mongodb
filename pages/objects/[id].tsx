import type { NextPage } from 'next';
import { fetchObjectById } from '../../lib/api-calls';
import { IObject } from '../../types';
import { IGetStaticPathsProps, IPageProps, IPath } from './object.types';

const Object: NextPage<IPageProps> = ({ object }) => {
  return (
    <div>
      <pre>{JSON.stringify(object, null, 2)}</pre>
    </div>
  );
};

export default Object;

export async function getStaticPaths(): Promise<IGetStaticPathsProps> {
  // const companies = await getCompanies();
  // const paths = companies?.map((company) => ({
  //   params: {
  //     slug: company.slug,
  //     region: company.regionSlug,
  //     district: company.districtSlug,
  //     industry: company.industrySlug,
  //   },
  // }));
  const paths = [{ params: { id: '41592' } }];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IPath) {
  const object: IObject = await fetchObjectById(params.id);
  return {
    props: {
      object,
    },
  };
}
