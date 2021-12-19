import type { NextPage } from 'next';
import { fetchObjectItems } from '../lib/api-calls';
import { IObjectItem } from '../types';

interface IPageProps {
  objects: IObjectItem[];
}

const Home: NextPage<IPageProps> = ({ objects }) => {
  return (
    <div>
      <pre>{JSON.stringify(objects, null, 2)}</pre>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  return {
    props: { objects },
  };
}
