import React, { useState } from "react";
import { useHistory, withRouter } from "react-router";
import { PostDataType } from "./post-interfaces/postDataType.type";

import { IPostValues } from "./post-interfaces/postValue.interface";

const Create = (): JSX.Element => {
  //
  let history = useHistory();

  const [values, setValues] = useState<IPostValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const userPostData: PostDataType = {
      title: values.title,
      description: values.description,
      body: values.body,
      author: values.author,
      data_posted: values.data_posted,
    };

    const checkSubmit = await submitform(userPostData);
    setSubmitSuccess(checkSubmit);
    setValues({ ...values, userPostData });
    setLoading(false);

    history.push("/");
  };

  const submitform = async (formData: PostDataType): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/container/post`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response.ok);
      return response.ok;
    } catch (ex) {
      return false;
    }
  };

  const postFormValues = (postFormData: IPostValues) => {
    setValues({ ...values, ...postFormData });
  };

  const handleInputOnchange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    postFormValues({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <section>
      <h1>Create Post</h1>
      {submitSuccess && "Successfully!"}
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            placeholder="title"
            id="title"
            type="text"
            autoComplete="off"
            name="title"
            onChange={handleInputOnchange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            placeholder="description"
            id="description"
            type="text"
            autoComplete="off"
            name="description"
            onChange={handleInputOnchange}
          />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <input
            placeholder="body"
            id="body"
            type="text"
            autoComplete="off"
            name="body"
            onChange={handleInputOnchange}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            placeholder="author"
            id="author"
            type="text"
            autoComplete="off"
            name="author"
            onChange={handleInputOnchange}
          />
        </div>
        <div>
          <label htmlFor="data_posted">Data post</label>
          <input
            placeholder="data_posted"
            id="data_posted"
            type="text"
            autoComplete="off"
            name="data_posted"
            onChange={handleInputOnchange}
          />
        </div>

        <div>
          <button type="submit">Create new Post</button>
          {loading && "Loading...🚀"}
        </div>
      </form>
    </section>
  );
};

export default withRouter(Create);
