# Blog frontend with Typescript React.js

1. In this front, experimentation view about use CRUD of Nest.js backend
2. So I decided not design of css. I had to check only CRUD right away.
3. API fetcher: fetch in Javascript

## 1. App.tsx (Just Routes)

```javascript
import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Create from './components/postManager/Create';
import Post from './components/postManager/Post';

const App = () => {
  return (
    <section className="App">
      <div className={'container'}>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/post/:id'} exact component={Post} />
        </Switch>
      </div>
    </section>
  );
};

export default App;
```

## 2. Home.tsx (View of whole data)

```javascript
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router';
import { PostDataType } from './postManager/post-interfaces/postDataType.type';
import PostView from './view/PostView';

const Home = (): JSX.Element => {
  //
  const [allpostData, setAllPostData] = useState < Array < PostDataType >> [];

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
```

## 3. Create.tsx

```javascript
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import { PostDataType } from './post-interfaces/postDataType.type';

import { IPostValues } from './post-interfaces/postValue.interface';

const Create = (): JSX.Element => {
  //
  let history = useHistory();

  const [values, setValues] = useState < IPostValues > [];
  const [submitSuccess, setSubmitSuccess] = useState < boolean > false;
  const [loading, setLoading] = useState < boolean > false;

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

    history.push('/');
  };

  const submitform = async (formData: PostDataType): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/container/post`,
        {
          method: 'post',
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
      {submitSuccess && 'Successfully!'}
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
          {loading && 'Loading...🚀'}
        </div>
      </form>
    </section>
  );
};

export default withRouter(Create);
```

## 4. Post.tsx (Get data that a user selected data)

- In here using the useParams { id }. Edit Delete are need it
- Edit and Delete exists within the Post.tsx

```javascript
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
    (useState < PostDataType) | (null > null);

  const [viewEditBtn, setViewEditBtn] = useState < boolean > false;

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
```
