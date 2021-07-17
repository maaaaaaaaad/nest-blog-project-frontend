import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router';
import { PostDataType } from './postManager/post-interfaces/postDataType.type';
import PostView from './view/PostView';

const Home = (): JSX.Element => {
  //
  const [allpostData, setAllPostData] = useState<Array<PostDataType>>([]);

  const getLoadAllPostData = async (): Promise<void> => {
    //
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/container/post`,
      {
        method: 'get',
      },
    );

    const result = await res.json();

    setAllPostData(result.datas);
  };

  useEffect(() => {
    getLoadAllPostData();
  }, []);

  return (
    <section>
      <ul>
        {allpostData &&
          allpostData.map((data) => (
            //
            <PostView
              key={data._id}
              title={data.title}
              description={data.description}
              body={data.body}
              author={data.author}
              posted_data={data.data_posted}
            />
            //
          ))}
      </ul>
    </section>
  );
};

export default withRouter(Home);
