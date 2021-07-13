import { createContext, useContext } from "react";
import { AuthContextType } from "../types/authContext.interface";

export const AuthContext = createContext<AuthContextType | null>(null);
export const UseAuth = () => useContext(AuthContext);
