import React from 'react';

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

  return (
    <section>
      <h1>Update Post</h1>

      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            placeholder={title}
            id="title"
            type="text"
            autoComplete="off"
            name="title"
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
