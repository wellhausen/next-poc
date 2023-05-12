import React from "react";
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from "react-query";

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}