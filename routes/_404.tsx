import { Link } from "aleph/react";

function E404() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>

      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
}

export default E404;
