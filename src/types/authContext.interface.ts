export interface AuthContextType {
  user?: any;
  loading?: boolean;
  authenticated?: boolean;
  handleRedirect?: () => void;
  getIdTokenClaims?: (...x: any) => any;
  loginWithRedirect?: (...x: any) => any;
  getTokenSilently?: (...x: any) => any;
  logout?: (...x: any) => any;
}
