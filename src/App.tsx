import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home";
import Create from "./components/postManager/Create";

const App = () => {
  return (
    <section className="App">
      <div className={"container"}>
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/create"} component={Create} />
        </Switch>
      </div>
    </section>
  );
};

export default App;
