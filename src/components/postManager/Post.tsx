import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams, withRouter } from 'react-router';
import PostView from '../view/PostView';
import Edit from './Edit';
import { PostDataType } from './post-interfaces/postDataType.type';

const Post = () => {
  //
  let history = useHistory();

  const [userSelectedPostData, SetUserSelectedPostData] =
    useState<PostDataType | null>(null);

  const [viewEditBtn, setViewEditBtn] = useState<boolean>(false);

  let { id }: { id: string } = useParams();

  const getSelectedPostData = useCallback(async (id: string) => {
    //
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/container/post/${id}`,
      {
        method: 'get',
      },
    );
    const result = await res.json();

    SetUserSelectedPostData(result.data);
  }, []);

  useEffect(() => {
    //
    getSelectedPostData(id);
  }, [getSelectedPostData, id]);

  const handleEditBtn = () => {
    setViewEditBtn((prev) => !prev);
  };

  const handleDeleteBtn = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/container/post/delete?id=${id}`,
      {
        method: 'delete',
      },
    );
    history.push('/');
  };

  return (
    <section>
      <ul>
        {userSelectedPostData && (
          <>
            <PostView
              key={userSelectedPostData._id}
              title={userSelectedPostData.title}
              description={userSelectedPostData.description}
              body={userSelectedPostData.body}
              author={userSelectedPostData.author}
              posted_data={userSelectedPostData.data_posted}
            />

            <button onClick={handleEditBtn}>
              {!viewEditBtn ? 'Edit' : 'Close'}
            </button>

            <button onClick={handleDeleteBtn}>Delete</button>

            {viewEditBtn && (
              <Edit
                title={userSelectedPostData.title}
                description={userSelectedPostData.description}
                body={userSelectedPostData.body}
                author={userSelectedPostData.author}
                posted_data={userSelectedPostData.data_posted}
              />
            )}
          </>
        )}
      </ul>
    </section>
  );
};

export default withRouter(Post);
