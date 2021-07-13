import { Auth0Client } from "@auth0/auth0-spa-js";
import React, { Component } from "react";
import { AuthProviderState } from "../types/authProviderState.type";

class AuthProvider extends Component<{}, AuthProviderState> {
  //
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      authClient: Auth0Client,
      authentication: false,
      loading: true,
    };
  }

  render() {
    return <div></div>;
  }
}

export default AuthProvider;
