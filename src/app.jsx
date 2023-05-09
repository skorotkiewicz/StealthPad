import { useEffect, useRef } from "react";
import useAsset from "ultra/hooks/use-asset.js";
import { Link, Route, Switch } from "wouter";
import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import Pad from "./pages/Pad.jsx";
import { useLocation } from "wouter";

import Gun from "gun/gun";
// import SEA from "gun/sea";

function App() {
  const [location, setLocation] = useLocation();
  const gun = useRef();

  useEffect(() => {
    gun.current = Gun();
    gun.current.opt({
      peers: [
        "https://grizzly.de1.hashbang.sh/gun",
        // "https://gun-manhattan.herokuapp.com/gun",
      ],
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>
          StealthPad - encrypt messages and store them in a decentralized way
        </title>
        <meta
          name="description"
          content="StealthPad is a secure open-source web application that allows you to
        encrypt your messages and store them in a decentralized way using the
        GUN.js library."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={useAsset("/favicon.ico")} />
        <link rel="stylesheet" href={useAsset("/style.css")} />
        <link rel="stylesheet" href={useAsset("/simple.css")}></link>
      </head>
      <body>
        {location !== "/pad/stealth" && (
          <header>
            <nav>
              <Link to="/" className={location == "/" ? "current" : ""}>
                Home
              </Link>
              <Link
                to="/pad/new"
                className={location == "/pad/new" ? "current" : ""}
              >
                New Pad
              </Link>
              <Link
                to="/about"
                className={location == "/about" ? "current" : ""}
              >
                About
              </Link>
            </nav>

            {location == "/" && (
              <>
                <h1>StealthPad</h1>
                <p>Encrypt your messages</p>
              </>
            )}
          </header>
        )}

        <main>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>

            <Route path="/pad/new">
              <Pad action="new" gun={gun} />
            </Route>

            <Route path="/pad/stealth">
              <Pad action="pad" gun={gun} />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route>404</Route>
          </Switch>
        </main>
        <footer>
          <p></p>
          <p>
            <a
              href="https://github.com/skorotkiewicz/StealthPad"
              target="_blank"
            >
              Source code
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

export default App;
