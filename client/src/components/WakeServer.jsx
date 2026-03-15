import { useEffect } from "react";

const API_URL = "https://project-form-2yll.onrender.com";

function WakeServer() {

  useEffect(() => {

    const wakeServer = async () => {
      try {
        await fetch(API_URL, { mode: "no-cors" });
        console.log("Backend wake request sent");
      } catch (err) {
        console.log("Wake request failed", err);
      }
    };

    wakeServer();

  }, []);

  return null;
}

export default WakeServer;