import React from "react";
import { Route, Switch } from "react-router";
import Create from "./components/postManager/Create";

const App = () => {
  return (
    <section className="App">
      <div className={"container"}>
        <Switch>
          <Route path={"/create"} component={Create} />
        </Switch>
      </div>
    </section>
  );
};

export default App;
