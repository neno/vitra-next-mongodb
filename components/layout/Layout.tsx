import { FC } from 'react';
import { Nav } from '../nav';

export const Layout: FC = ({ children }) => {
  return (
    <div className="bg-white">
      <div>
        <Nav />
      </div>
      <main>{children}</main>
    </div>
  );
};
