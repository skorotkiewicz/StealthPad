import { Link, useRouter } from "aleph/react";

function Header() {
  const { url } = useRouter();
  const pathname = url.pathname;

  return (
    <>
      {pathname !== "/pad/stealth" && (
        <header>
          <nav>
            <Link to="/" className={pathname == "/" ? "current" : ""}>
              Home
            </Link>
            <Link
              to="/pad/new"
              className={pathname == "/pad/new" ? "current" : ""}
            >
              New Pad
            </Link>
            <Link to="/about" className={pathname == "/about" ? "current" : ""}>
              About
            </Link>
          </nav>

          {pathname == "/" && (
            <>
              <h1>StealthPad</h1>
              <p>Encrypt your messages</p>
            </>
          )}
        </header>
      )}
    </>
  );
}

export default Header;
