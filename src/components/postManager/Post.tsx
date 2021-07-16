import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, withRouter } from "react-router";
import { PostDataType } from "./post-interfaces/postDataType.type";

const Post = () => {
  //
  const [userSelectedPostData, SetUserSelectedPostData] =
    useState<PostDataType | null>(null);

  let { id }: { id: string } = useParams();

  const getSelectedPostData = async () => {
    //
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/container/post/${id}`,
      {
        method: "get",
      }
    );
    const result = await res.json();

    SetUserSelectedPostData(result);
  };

  useEffect(() => {
    getSelectedPostData();
  });

  return <section></section>;
};

export default withRouter(Post);
