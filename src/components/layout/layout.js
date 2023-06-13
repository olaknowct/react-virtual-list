import { Fragment } from 'react';

import NavBar from '../navbar/navbar';

function Layout({ children }) {
  return (
    <Fragment>
      <NavBar />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
