import PadComp from "~/components/Pad.tsx";
import Loading from "~/components/Loading.tsx";
import { useStealth } from "~/context/StealthContext.jsx";

const Pad = () => {
  const { connected } = useStealth();

  return <>{connected ? <PadComp /> : <Loading />}</>;
};

export default Pad;
