import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import CodeMirror from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import sjcl from "sjcl";
import md5 from "md5";
import { useSearchParams } from "../wouter/index.jsx";
import PassForm from "../components/PassForm.jsx";
import { decrypt } from "../components/decrypt.js";

const Pad = ({ action, gun }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [vimMode, setVimMode] = useState(true);
  const [location, navigate] = useLocation();
  const searchParams = useSearchParams();

  const desalt = decodeURIComponent(searchParams.get("salt"));
  const deiv = decodeURIComponent(searchParams.get("iv"));

  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
  }, []);

  const save = useCallback(async () => {
    if (!value) return;
    setLoading(true);
    setError("");

    const encrypt = sjcl.encrypt(password, value);
    const encrypted = JSON.parse(encrypt);

    if (encrypted.ct) {
      // save to gun > ct is message
      gun.current
        .get("StealthPad")
        .get("Pad")
        .get(md5(encrypted.salt))
        .put(encrypted.ct, (res) => {
          if (res.ok) {
            navigate(
              `/pad/stealth?salt=${encodeURIComponent(
                encrypted.salt
              )}&iv=${encodeURIComponent(encrypted.iv)}`
            );
            setLoading(false);
          }
        });
    }
  }, [value]);

  const setPadPassword = (e) => {
    e.preventDefault();
    const password = e.target[0].value;

    if (!password) return setError("Your need to set password.");
    if (password.length <= 5)
      return setError("Password must have minimum 6 characters.");

    return setPassword(password);
  };

  const getPad = () => {
    setError("");

    const salt = decodeURIComponent(searchParams.get("salt"));
    const iv = decodeURIComponent(searchParams.get("iv"));

    if (action == "pad" && password && salt && iv) {
      // get pad
      setLoading(true);
      gun.current
        .get("StealthPad")
        .get("Pad")
        .get(md5(salt))
        .once((data) => {
          console.log("recv data:", data);
          if (data) {
            try {
              const decrypted = decrypt({
                password,
                ct: data,
                iv,
                salt,
              });
              setValue(decrypted);
            } catch (error) {
              console.error(error?.message);
              setError("Credentials are not correct.");
            }
          } else {
            setError("Pad not found or try again.");
          }
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    getPad();

    if (password && !loading) {
      document.documentElement.style.setProperty("--display", "block");
    } else {
      document.documentElement.style.setProperty("--display", "grid");
    }
  }, [password, action, searchParams]);

  return (
    <div className="pad">
      {(desalt || deiv) != "null" && password && (
        <span className="infoUpdate">
          After each update your have new URL, the old URL is removed.
        </span>
      )}

      {loading ? (
        <h3>
          <p>Loading...</p>
          <button onClick={getPad}>Retry...</button>
        </h3>
      ) : !password || error ? (
        <PassForm
          setPadPassword={setPadPassword}
          action={action}
          error={error}
        />
      ) : (
        <div className="pad-nav">
          <header>
            <nav>
              <button
                onClick={() => {
                  setPassword("");
                  navigate("/pad/new");
                }}
              >
                New Pad
              </button>
              <button onClick={save}>
                {(desalt || deiv) != "null" ? "Update" : "Save"} Pad
              </button>

              {(desalt || deiv) != "null" && (
                <input
                  type="text"
                  defaultValue={`/pad/stealth?salt=${desalt}&iv=${deiv}`}
                />
              )}

              <span className="vimMode">
                Vim Mode:{" "}
                <input
                  checked={vimMode}
                  type="checkbox"
                  onChange={(e) => setVimMode(e.target.checked)}
                />
              </span>
            </nav>
          </header>

          <CodeMirror
            value={value}
            height="80vh"
            extensions={vimMode ? [vim()] : []}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default Pad;
