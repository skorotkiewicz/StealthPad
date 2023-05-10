import { Head, Link } from "aleph/react";
import { useEffect } from "react";

function Index() {
  useEffect(() => {
    document.documentElement.style.setProperty("--display", "grid");
  }, []);

  return (
    <>
      <Head>
        <title>
          StealthPad - encrypt messages and store them in a decentralized way
        </title>
      </Head>

      <p className="notice">
        <Link className="button" to="/pad/new">
          New Pad
        </Link>
      </p>
    </>
  );
}

export default Index;
