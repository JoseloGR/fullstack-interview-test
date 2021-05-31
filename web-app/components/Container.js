import { Fragment } from "react";
import Head from "next/head";
import Navigation from "./Navigation";

export default function Container({children}) {
  return (
    <Fragment>
      <Head>
        <title>Git Flat</title>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap"
          rel="stylesheet"
          key="font" />
      </Head>
      <Navigation/>
      <div className="container mx-auto mt-10">
        {children}
      </div>
    </Fragment>
  );
}