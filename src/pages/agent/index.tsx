import React from 'react';
import type { NextPageWithLayout } from '~/pages/_app';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <p>todo</p>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  // TODO ここでLayoutコンポーネントを返す
  return <div>{page}</div>;
};

export default Page;
