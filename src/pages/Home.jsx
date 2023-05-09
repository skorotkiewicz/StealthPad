import { useEffect } from "react";
import { Link } from "wouter";

function HomePage() {
  useEffect(() => {
    document.documentElement.style.setProperty("--display", "grid");
  }, []);

  return (
    <p className="notice">
      <Link className="button" to="/pad/new">
        New Pad
      </Link>
    </p>
  );
}

export default HomePage;
