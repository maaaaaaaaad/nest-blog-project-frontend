import { createContext, useContext } from "react";
import { ContextValueType } from "../auth-interfaces/contextValue";

export const AuthContext: any = createContext<ContextValueType | null>(null);
export const useAuth: any = () => useContext(AuthContext);
