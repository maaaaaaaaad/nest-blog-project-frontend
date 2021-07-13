import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
} from "@auth0/auth0-spa-js";
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

  authConfigSet: Auth0ClientOptions = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN! as string,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID! as string,
    redirect_uri: window.location.origin,
  };

  componentDidMount() {
    this.initAuth();
  }

  initAuth = async () => {
    const authClient = await createAuth0Client(this.authConfigSet);
    this.setState({ authClient });

    const authentication = await authClient.isAuthenticated();
    const user = authentication ? await authClient.getUser() : null;

    this.setState({ loading: false, authentication, user });
  };

  render() {
    return <div></div>;
  }
}

export default AuthProvider;
