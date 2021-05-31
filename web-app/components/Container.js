import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Container({children}) {
  return (
    <Fragment>
      <Head>
        <title>Git Flat</title>
      </Head>
      <div className="container mx-auto">
        <nav>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </nav>
        <div className="container">{children}</div>
      </div>
    </Fragment>
  );
}