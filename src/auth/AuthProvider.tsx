import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
} from "@auth0/auth0-spa-js";
import React, { Component, createContext, useContext } from "react";

interface ContextValueType {
  isAuthenticated?: boolean;
  user?: any;
  isLoading?: boolean;
  handleRedirectCallback?: () => void;
  getIdTokenClaims?: (...p: any) => any;
  loginWithRedirect?: (...p: any) => any;
  getTokenSilently?: (...p: any) => any;
  logout?: (...p: any) => any;
}

export const AuthContext = createContext<ContextValueType | null>(null);
export const useAuth = () => useContext(AuthContext);

interface IAuthState {
  authClient: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: any;
}

const initConfig: Auth0ClientOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN! as string,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID! as string,
  redirect_uri: window.location.origin,
};

class AuthProvider extends Component<{}, IAuthState> {
  //
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      authClient: Auth0Client,
      isAuthenticated: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.initAuth();
  }

  initAuth = async () => {
    const authClient = await createAuth0Client(initConfig);
    this.setState({ authClient });

    if (window.location.search.includes("code=")) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await authClient.isAuthenticated();
    const user = isAuthenticated ? await authClient.getUser() : null;

    this.setState({ isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });
    const realAuthClient: Auth0Client = this.state.authClient;

    await realAuthClient.handleRedirectCallback();
    const user = await realAuthClient.getUser();

    this.setState({ isLoading: false, isAuthenticated: true, user });

    window.history.replaceState(
      //
      {},
      document.title,
      window.location.pathname
    );
  };

  render() {
    const { children } = this.props;
    const { user, authClient, isAuthenticated, isLoading } = this.state;

    const realAuthClient: Auth0Client = authClient;

    const configValues = {
      user,
      isAuthenticated,
      isLoading,
      getIdTokenClaims: (...x: any) => realAuthClient.getIdTokenClaims(...x),
      loginWithRedirect: (...x: any) => realAuthClient.loginWithRedirect(...x),
      getTokenSilently: (...x: any) => realAuthClient.getTokenSilently(...x),
      logout: (...x: any) => realAuthClient.logout(...x),
    };

    return (
      <AuthContext.Provider value={configValues}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
