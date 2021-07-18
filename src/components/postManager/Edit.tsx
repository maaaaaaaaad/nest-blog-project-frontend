import React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { PostUpdateDataType } from './post-interfaces/postUpdateData.type';

interface Props {
  title: string;
  description: string;
  body: string;
  author: string;
  posted_data: string;
}

const Edit: React.FC<Props> = ({
  title,
  description,
  body,
  author,
  posted_data,
}) => {
  //

  let history = useHistory();
  let { id }: { id: string } = useParams();

  const [currentPostData, setCurrentPostData] = useState<PostUpdateDataType>({
    title,
    description,
    body,
    author,
    data_posted: posted_data,
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userUpdatePostData: PostUpdateDataType = {
      title: currentPostData.title,
      description: currentPostData.description,
      body: currentPostData.body,
      author: currentPostData.author,
      data_posted: currentPostData.data_posted,
    };

    await submitform(userUpdatePostData);

    history.push(`/post/${id}`);
  };

  const submitform = async (formData: PostUpdateDataType): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/container/post/update?id=${id}`,
        {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      console.log(response.ok);
      return response.ok;
    } catch (ex) {
      return false;
    }
  };

  const updateFormValues = (updatedFormData: PostUpdateDataType) => {
    setCurrentPostData({ ...currentPostData, ...updatedFormData });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    updateFormValues({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <section>
      <h1>Update Post</h1>

      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            placeholder={title}
            id="title"
            type="text"
            autoComplete="off"
            name="title"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            placeholder={description}
            id="description"
            type="text"
            autoComplete="off"
            name="description"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <input
            placeholder={body}
            id="body"
            type="text"
            autoComplete="off"
            name="body"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            placeholder={author}
            id="author"
            type="text"
            autoComplete="off"
            name="author"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="data_posted">Data post</label>
          <input
            placeholder={posted_data}
            id="data_posted"
            type="text"
            autoComplete="off"
            name="data_posted"
            onChange={onChange}
          />
        </div>

        <div>
          <button type="submit">Save Changed!</button>
        </div>
      </form>
    </section>
  );
};

export default Edit;
