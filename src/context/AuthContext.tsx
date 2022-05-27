import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import {
  recoverUserInformation,
  setBearerToken,
  signInRequest,
} from "../services/api";

import Router from "next/router";
import { useToast } from "@chakra-ui/react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const { ["edify-books.token"]: token } = parseCookies();
  const isAuthenticated = token ? true : false;

  useEffect(() => {
    if (token) {
      recoverUserInformation()
        .then((user) => {
          const { id, name, email, role } = user;
          setUser({ id, name, email, role });
        })
        .catch((err) => {
          Router.push("/login");
        });
    }
  }, []);

  const toaster = useToast();
  async function signIn({ email, password }: SignInData) {
    const response = await signInRequest({
      email,
      password,
    });

    if (response?.statusCode >= 400 && response?.statusCode < 500) {
      toaster({
        title: "Erro",
        description: "Dados de acessos incorretos. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const { access_token } = response;

      setCookie(undefined, "edify-books.token", access_token, {
        maxAge: 60 * 60 * 2, // 1 hour
      });

      setBearerToken(access_token);

      const { id, name, email, role } = await recoverUserInformation();

      setUser({ id, name, email, role });

      Router.push("/");
    }
  }

  async function signOut() {
    setCookie(undefined, "edify-books.token", "", {
      maxAge: 0,
    });
    setUser(null);
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
