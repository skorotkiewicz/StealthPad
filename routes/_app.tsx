import Header from "~/components/Header.tsx";
import Footer from "~/components/Footer.tsx";
import { StealthContext } from "~/context/StealthContext.jsx";

function App({ children }: { children: React.ReactNode }) {
  return (
    <StealthContext>
      <Header />
      <main>{children}</main>
      <Footer />
    </StealthContext>
  );
}

export default App;
