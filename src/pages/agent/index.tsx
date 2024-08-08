import React from 'react';
import { ReactTinderCard } from '~/components/ReactTinderCard';
import type { NextPageWithLayout } from '~/pages/_app';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <h2>上にスワイプしてくださいな</h2>
        <ReactTinderCard />
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  // TODO ここでLayoutコンポーネントを返す
  return <div>{page}</div>;
};

export default Page;
