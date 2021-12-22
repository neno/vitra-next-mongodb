import type { NextPage } from 'next';
import { ListItem } from '../components/list-item';
import { fetchObjectItems } from '../lib/api-calls';
import { IObjectItem } from '../types';

interface IPageProps {
  objects: IObjectItem[];
}

const Home: NextPage<IPageProps> = ({ objects }) => {
  return (
    <div>
      {objects.map((obj) => (
        <ListItem
          key={obj.id}
          id={obj.id}
          title={obj.title}
          imageUrl={obj.image}
          text={obj.designer}
        />
      ))}
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
