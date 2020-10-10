import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "@emotion/styled";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  padding: 24pt;
  background-color: rgba(253, 249, 241, 1);
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/users">
          <a>Users List</a>
        </Link>{" "}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>{"I'm here to stay (Footer)"}</span>
    </footer>
  </Container>
);

export default Layout;
