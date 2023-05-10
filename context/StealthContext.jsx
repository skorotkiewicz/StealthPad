import { createContext, useContext, useState, useEffect, useRef } from "react";
import Gun from "gun/gun";
// import SEA from "gun/sea";

const Context = createContext();

export const StealthContext = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const gun = useRef();

  useEffect(() => {
    gun.current = Gun();
    gun.current.opt({
      peers: [
        "https://grizzly.de1.hashbang.sh/gun",
        // "https://gun-manhattan.herokuapp.com/gun",
      ],
    });

    const opt_peers = gun.current.back("opt.peers");
    if (opt_peers) setConnected(true);
  }, []);

  // const contextValue = useMemo(
  //   () => ({ password, setPassword }),
  //   [password, setPassword]
  // );

  return (
    <Context.Provider value={{ gun, connected }}>{children}</Context.Provider>
  );
};

export const useStealth = () => useContext(Context);
