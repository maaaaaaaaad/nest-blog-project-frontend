import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home";
import Create from "./components/postManager/Create";
import Post from "./components/postManager/Post";

const App = () => {
  return (
    <section className="App">
      <div className={"container"}>
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/create"} exact component={Create} />
          <Route path={"/post/:id"} exact component={Post} />
        </Switch>
      </div>
    </section>
  );
};

export default App;
