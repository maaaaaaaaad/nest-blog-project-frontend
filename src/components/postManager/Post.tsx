import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams, withRouter } from "react-router";
import PostView from "../view/PostView";
import Button from "./edit_delete_button/Button";
import { PostDataType } from "./post-interfaces/postDataType.type";

const Post = () => {
  //
  const [userSelectedPostData, SetUserSelectedPostData] =
    useState<PostDataType | null>(null);

  let { id }: { id: string } = useParams();

  const getSelectedPostData = useCallback(async (id: string) => {
    //
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/container/post/${id}`,
      {
        method: "get",
      }
    );
    const result = await res.json();

    SetUserSelectedPostData(result.data);
  }, []);

  useEffect(() => {
    //
    getSelectedPostData(id);
  }, [getSelectedPostData, id]);

  console.log(userSelectedPostData);

  return (
    <section>
      <ul>
        {userSelectedPostData && (
          <PostView
            key={userSelectedPostData._id}
            title={userSelectedPostData.title}
            description={userSelectedPostData.description}
            body={userSelectedPostData.body}
            author={userSelectedPostData.author}
            posted_data={userSelectedPostData.data_posted}
          />
        )}
        <Button />
      </ul>
    </section>
  );
};

export default withRouter(Post);
