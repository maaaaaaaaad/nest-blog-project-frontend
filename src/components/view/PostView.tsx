import React from "react";

interface Props {
  title: string;
  description: string;
  body: string;
  author: string;
  posted_data: string;
}

const PostView: React.FC<Props> = ({
  title,
  description,
  body,
  author,
  posted_data,
}) => {
  //
  return (
    <li>
      <h2>Title : {title}</h2>
      <p>Description : {description}</p>
      <p>Body : {body}</p>
      <p>Author : {author}</p>
      <p>Posted Data : {posted_data}</p>
    </li>
  );
};

export default PostView;
