import { Head } from "aleph/react";
import { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    document.documentElement.style.setProperty("--display", "grid");
  }, []);

  return (
    <div>
      <Head>
        <title>About StealthPad</title>
      </Head>

      <p>
        StealthPad is a secure open-source web application that allows you to
        encrypt your messages and store them in a decentralized way using the
        GUN.js library.
      </p>

      <p>
        With StealthPad, you can ensure the confidentiality of your messages and
        data, knowing that they are protected by strong encryption algorithms.
        The app provides a user-friendly interface that makes it easy to use,
        even for non-technical users. Simply choose a password, enter your
        message and let StealthPad handle the rest.
      </p>

      <p>
        Your message is encrypted and stored securely, with only you and those
        you choose to share it with having access to it.
      </p>

      <p>
        With its decentralized architecture, you can trust that your data is
        safe and will not be subject to the vulnerabilities of centralized
        systems. Whether you need to store sensitive information, share
        confidential messages, or simply want to protect your privacy,
        StealthPad is the perfect solution.
      </p>
    </div>
  );
}

export default AboutPage;
