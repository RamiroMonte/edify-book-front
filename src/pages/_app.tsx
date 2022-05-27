import "semantic-ui-css/semantic.min.css";

import { QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
