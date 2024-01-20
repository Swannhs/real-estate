import { SessionProvider } from "next-auth/react";
import { ComponentType } from "react";
import { Session } from "next-auth";

interface MyAppProps {
  Component: ComponentType;
  pageProps: {
    session: Session;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
