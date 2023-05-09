import { useEffect } from "react";

const Error404 = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--display", "grid");
  }, []);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
    </div>
  );
};

export default Error404;
